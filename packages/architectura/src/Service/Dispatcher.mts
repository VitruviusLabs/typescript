import { type Dirent } from "node:fs";

import { basename } from "node:path";

import { TypeGuard } from "@vitruvius-labs/ts-predicate";

import { BaseEndpoint } from "../Core/Base/BaseEndpoint.mjs";

import { HelloWorldEndpoint } from "../index.mjs";

import { FileSystem } from "./FileSystem.mjs";

import { LoggerService } from "./logger/logger.service.mjs";

import type { ConstructorOf } from "../utils/ConstructorOf.mjs";

class Dispatcher
{
	private static readonly ENDPOINTS_DIRECTORIES: Array<string> = [];
	private static readonly ENDPOINTS: Map<string, BaseEndpoint> = new Map();

	/**
	 * GetEndpoints
	 */
	public static GetEndpoints(): Map<string, BaseEndpoint>
	{
		if (this.ENDPOINTS.size === 0)
		{
			const MAP: Map<string, BaseEndpoint> = new Map();

			MAP.set('GET::^.*$', new HelloWorldEndpoint());

			return MAP;
		}

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
		for (const DIRECTORY of this.ENDPOINTS_DIRECTORIES)
		{
			await Dispatcher.ParseDirectoryForEndpoints(DIRECTORY);
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
					let endpoint: unknown = EXPORTS[KEY];

					if (this.IsEndpointConstructor(endpoint))
					{
						endpoint = new endpoint();
					}

					if (endpoint instanceof BaseEndpoint)
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
				LoggerService.LogError(error);

				return;
			}

			LoggerService.Critical(`A non-Error has been thrown. Received entity: ${JSON.stringify(error)}`);
		}
	}

	private static IsEndpointConstructor(value: unknown): value is ConstructorOf<BaseEndpoint>
	{
		return TypeGuard.isFunction(value) && value.prototype instanceof BaseEndpoint;
	}

}

export { Dispatcher };
