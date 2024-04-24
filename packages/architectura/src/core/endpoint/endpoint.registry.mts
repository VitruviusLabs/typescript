import type { Dirent } from "node:fs";
import { type ConstructorOf, TypeGuard } from "@vitruvius-labs/ts-predicate";
import { HelloWorldEndpoint } from "../../endpoint/hello-world.endpoint.mjs";
import { FileSystemService } from "../../service/file-system/file-system.service.mjs";
import { LoggerProxy } from "../../service/logger/logger.proxy.mjs";
import { BaseEndpoint } from "./base.endpoint.mjs";

class EndpointRegistry
{
	private static readonly ENDPOINTS_DIRECTORIES: Array<string> = [];
	private static readonly ENDPOINTS: Map<string, BaseEndpoint> = new Map();

	public static GetEndpoints(): ReadonlyMap<string, BaseEndpoint>
	{
		if (this.ENDPOINTS.size === 0)
		{
			const MAP: Map<string, BaseEndpoint> = new Map();

			MAP.set("GET::^.*$", new HelloWorldEndpoint());

			return MAP;
		}

		return this.ENDPOINTS;
	}

	public static AddEndpoint(endpoint: BaseEndpoint): void
	{
		const METHOD: string = endpoint.getMethod();
		const ROUTE: string = endpoint.getRoute().toString();

		const IDENTIFIER: string = `${METHOD}::${ROUTE}`;

		if (this.ENDPOINTS.has(IDENTIFIER))
		{
			throw new Error(`An endpoint is already added for method ${METHOD} and route "${ROUTE}".`);
		}

		this.ENDPOINTS.set(IDENTIFIER, endpoint);
	}

	public static async AddEndpointsDirectory(directory: string): Promise<void>
	{
		if (!await FileSystemService.DirectoryExists(directory))
		{
			throw new Error(`Impossible to add directory ${directory} as an endpoint directory as it does not exist.`);
		}

		this.ENDPOINTS_DIRECTORIES.push(directory);
	}

	public static async RegisterEndpoints(): Promise<void>
	{
		for (const DIRECTORY of this.ENDPOINTS_DIRECTORIES)
		{
			await EndpointRegistry.ParseDirectoryForEndpoints(DIRECTORY);
		}
	}

	private static async ParseDirectoryForEndpoints(directory: string): Promise<void>
	{
		const CONTENTS: Array<Dirent> = await FileSystemService.ReadDirectory(directory);

		for (const ENTITY of CONTENTS)
		{
			const FILE_PATH: string = `${directory}/${ENTITY.name}`;

			if (ENTITY.isDirectory())
			{
				await this.ParseDirectoryForEndpoints(FILE_PATH);

				continue;
			}

			if (ENTITY.isFile() && ENTITY.name.includes(".endpoint."))
			{
				await this.ExtractEndpoint(FILE_PATH);
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
				for (let [, endpoint] of Object.entries(EXPORTS))
				{
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
				LoggerProxy.Error(error);

				return;
			}

			LoggerProxy.Critical(`A non-Error has been thrown. Received entity: ${JSON.stringify(error)}`);
		}
	}

	private static IsEndpointConstructor(value: unknown): value is ConstructorOf<BaseEndpoint>
	{
		return TypeGuard.isFunction(value) && value.prototype instanceof BaseEndpoint;
	}
}

export { EndpointRegistry };
