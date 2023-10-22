import { TypeGuard } from "@vitruvius-lab/ts-predicate";


import { isBaseEndpoint } from "./Dispatcher/isBaseEndpoint.mjs";

import { FileSystem } from "./FileSystem.mjs";

import { Logger } from "./Logger.mjs";

import type { BaseEndpoint } from "../Endpoint/BaseEndpoint.mjs";

import type { Dirent } from "node:fs";

class Dispatcher
{
	private static readonly ENDPOINTS_DIRECTORIES: Array<string> = [];
	private static readonly ENDPOINTS: Map<string, typeof BaseEndpoint> = new Map();

	/**
	 * GetEndpoints
	 */
	public static GetEndpoints(): Map<string, typeof BaseEndpoint>
	{
		return this.ENDPOINTS;
	}

	public static async AddEndpointsDirectory(directory: string): Promise<void>
	{
		if (!(await FileSystem.DirectoryExists(directory))) {
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

		for (const directory of this.ENDPOINTS_DIRECTORIES) {
			await Dispatcher.ParseDirectoryForEndpoints(directory);
		}
	}

	// @TODO: Refactor the cognitive complexity.
	// eslint-disable-next-line sonarjs/cognitive-complexity -- This is a temporary solution.
	private static async ParseDirectoryForEndpoints(directory: string): Promise<void>
	{
		const CONTENTS: Array<Dirent> = await FileSystem.ReadDirectory(directory);

		for (const ENTITY of CONTENTS)
		{
			const FILEPATH: string = `${directory}/${ENTITY.name}`;

			if (ENTITY.isDirectory())
			{
				await Dispatcher.ParseDirectoryForEndpoints(FILEPATH);
				continue;
			}

			if (ENTITY.isFile() && ENTITY.name.endsWith(".mjs"))
			{
				try
				{
					const CONTENT: unknown = await import(FILEPATH);

					if (TypeGuard.isRecord(CONTENT))
					{
						const KEY: string = ENTITY.name.replace(/\..*$/, "");
						const EXPORT: unknown = CONTENT[KEY];

						if (isBaseEndpoint(EXPORT))
						{
							this.ENDPOINTS.set(EXPORT.GetRoute(), EXPORT);
						}
					}
				}
				catch (error: unknown)
				{
					if (error instanceof Error)
					{
						Logger.LogError(error);
						continue;
					}

					Logger.Critical(`A non-Error has been thrown. Received entity: ${JSON.stringify(error)}`);
				}
			}
		}
	}
}

export { Dispatcher };
