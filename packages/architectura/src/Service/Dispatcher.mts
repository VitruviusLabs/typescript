import { type Dirent } from "node:fs";

import { basename } from "node:path";

import { TypeGuard } from "@vitruvius-labs/ts-predicate";

import { isBaseEndpoint } from "./Dispatcher/isBaseEndpoint.mjs";

import { isEndpointConstructor } from "./Dispatcher/isEndpointConstructor.mjs";

import { FileSystem } from "./FileSystem.mjs";

import { Logger } from "./Logger.mjs";

import type { BaseEndpoint } from "../Endpoint/BaseEndpoint.mjs";

class Dispatcher
{
	private static readonly ENDPOINTS_DIRECTORIES: Array<string> = [];
	private static readonly ENDPOINTS: Map<string, BaseEndpoint> = new Map();

	/**
	 * GetEndpoints
	 */
	public static GetEndpoints(): Map<string, BaseEndpoint>
	{
		return this.ENDPOINTS;
	}

	/**
	 * AddEndpoint
	 */
	public static AddEndpoint(endpoint: BaseEndpoint): void
	{
		const METHOD: string = endpoint.getMethod();
		const ROUTE: string = endpoint.getRoute();

		const IDENTIFIER: string = `${METHOD}::${ROUTE}`;

		if (this.ENDPOINTS.has(IDENTIFIER))
		{
			throw new Error(`An endpoint is already added for method ${METHOD} and route "${ROUTE}".`);
		}

		this.ENDPOINTS.set(IDENTIFIER, endpoint);
	}

	public static async AddEndpointsDirectory(directory: string): Promise<void>
	{
		if (!(await FileSystem.DirectoryExists(directory)))
		{
			throw new Error(`Impossible to add directory ${directory} as an endpoint directory as it does not exist.`);
		}

		this.ENDPOINTS_DIRECTORIES.push(directory);
	}

	/**
	 * RegisterEndpoints
	 */
	public static async RegisterEndpoints(): Promise<void>
	{
		const ROOT_DIRECTORY: string = await FileSystem.ComputeRootDirectory();

		await Dispatcher.ParseDirectoryForEndpoints(`${ROOT_DIRECTORY}/Endpoint`);

		for (const directory of this.ENDPOINTS_DIRECTORIES)
		{
			await Dispatcher.ParseDirectoryForEndpoints(directory);
		}
	}

	private static async ParseDirectoryForEndpoints(directory: string): Promise<void>
	{
		const CONTENTS: Array<Dirent> = await FileSystem.ReadDirectory(directory);

		for (const ENTITY of CONTENTS)
		{
			const FILEPATH: string = `${directory}/${ENTITY.name}`;

			if (ENTITY.isDirectory())
			{
				await this.ParseDirectoryForEndpoints(FILEPATH);

				continue;
			}

			if (ENTITY.isFile() && ENTITY.name.endsWith(".mjs"))
			{
				await this.ExtractEndpoint(FILEPATH);
			}
		}
	}

	private static async ExtractEndpoint(path: string): Promise<void>
	{
		try
		{
			const EXPORTS: unknown = await import(path);

			if (TypeGuard.isRecord(EXPORTS))
			{
				const KEYS: Array<string> = [
					basename(path, ".mjs"),
					"endpoint"
				];

				for (const KEY of KEYS)
				{
					const EXPORT: unknown = EXPORTS[KEY];

					let endpoint: BaseEndpoint | undefined = undefined;

					if (isBaseEndpoint(EXPORT))
					{
						endpoint = EXPORT;
					}

					if (isEndpointConstructor(EXPORT))
					{
						endpoint = new EXPORT();
					}

					if (isBaseEndpoint(endpoint))
					{
						this.AddEndpoint(endpoint);

						return;
					}
				}
			}
		}
		catch (error: unknown)
		{
			if (error instanceof Error)
			{
				Logger.LogError(error);

				return;
			}

			Logger.Critical(`A non-Error has been thrown. Received entity: ${JSON.stringify(error)}`);
		}
	}
}

export { Dispatcher };
