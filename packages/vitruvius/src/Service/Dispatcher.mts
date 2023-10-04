import { TypeGuard } from "@vitruvius-lab/ts-predicate";

import { BaseEndpoint } from "../Endpoint/BaseEndpoint.mjs";

import { FileSystem } from "./FileSystem.mjs";

import { Logger } from "./Logger.mjs";

import type { Dirent } from "node:fs";

class Dispatcher
{
	private static readonly ENDPOINTS: Array<typeof BaseEndpoint> = [];

	/**
	 * GetEndpoints
	 */
	public static GetEndpoints(): Array<typeof BaseEndpoint>
	{
		return this.ENDPOINTS;
	}

	/**
	 * RegisterEndpoints
	 */
	public static async RegisterEndpoints(): Promise<void>
	{
		const ROOT_DIRECTORY: string = await FileSystem.ComputeRootDirectory();

		await Dispatcher.ParseDirectoryForEndpoints(`${ROOT_DIRECTORY}/Endpoint`);
	}

	private static IsTypeOfBaseEndpoint(value: unknown): value is typeof BaseEndpoint
	{
		return value instanceof Function && value.prototype instanceof BaseEndpoint && value !== BaseEndpoint;
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

						if (Dispatcher.IsTypeOfBaseEndpoint(EXPORT))
						{
							this.ENDPOINTS.push(EXPORT);
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
