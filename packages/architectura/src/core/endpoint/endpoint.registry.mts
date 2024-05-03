import type { Dirent } from "node:fs";
import { isFunction, isRecord, isString } from "@vitruvius-labs/ts-predicate/type-guard";
import { type ConstructorOf, getConstructorOf } from "@vitruvius-labs/ts-predicate/helper";
import { HelloWorldEndpoint } from "../../endpoint/hello-world.endpoint.mjs";
import { FileSystemService } from "../../service/file-system/file-system.service.mjs";
import { LoggerProxy } from "../../service/logger/logger.proxy.mjs";
import { BaseEndpoint } from "./base.endpoint.mjs";
import { HTTPMethodEnum } from "../_index.mjs";

class EndpointRegistry
{
	private static readonly ENDPOINTS: Map<string, BaseEndpoint> = new Map();

	public static GetEndpoints(): ReadonlyMap<string, BaseEndpoint>
	{
		if (this.ENDPOINTS.size === 0)
		{
			LoggerProxy.Warning("No endpoints have been added. Default endpoint.");

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

		LoggerProxy.Debug(`Endpoint added ${METHOD} ${ROUTE}.`);

		this.ENDPOINTS.set(IDENTIFIER, endpoint);
	}

	public static async AddEndpointsDirectory(directory: string): Promise<void>
	{
		await FileSystemService.ConfirmDirectoryExistence(directory);

		await EndpointRegistry.ParseDirectoryForEndpoints(directory);
	}

	private static async ParseDirectoryForEndpoints(directory: string): Promise<void>
	{
		const ENTITIES: Array<Dirent> = await FileSystemService.ReadDirectory(directory);

		for (const ENTITY of ENTITIES)
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
		const EXPORTS: unknown = await import(path);

		if (isRecord(EXPORTS))
		{
			for (let [, endpoint] of Object.entries(EXPORTS))
			{
				if (this.IsEndpointConstructor(endpoint))
				{
					endpoint = new endpoint();
				}

				if (this.IsConcreteEndpoint(endpoint))
				{
					this.AddEndpoint(endpoint);

					return;
				}
			}
		}
	}

	private static IsEndpointConstructor(value: unknown): value is ConstructorOf<BaseEndpoint>
	{
		return isFunction(value) && value.prototype instanceof BaseEndpoint;
	}

	private static IsConcreteEndpoint(value: unknown): value is BaseEndpoint
	{
		if (!(value instanceof BaseEndpoint))
		{
			return false;
		}

		const method: unknown = Reflect.get(value, "method");
		const route: unknown = Reflect.get(value, "route");

		if (method === undefined && route === undefined)
		{
			// Abstract class
			return false;
		}

		if (!isString(method))
		{
			throw new Error(`${getConstructorOf(value).name} method must be an HTTPMethodEnum`);
		}

		switch (method)
		{
			case HTTPMethodEnum.GET:
			case HTTPMethodEnum.HEAD:
			case HTTPMethodEnum.POST:
			case HTTPMethodEnum.PUT:
			case HTTPMethodEnum.DELETE:
			case HTTPMethodEnum.CONNECT:
			case HTTPMethodEnum.OPTIONS:
			case HTTPMethodEnum.TRACE:
			case HTTPMethodEnum.PATCH:
				break;

			default:
				throw new Error(`${getConstructorOf(value).name} method must be an HTTPMethodEnum.`);
		}

		if (!isString(route) && !(route instanceof RegExp))
		{
			throw new Error(`${getConstructorOf(value).name} route must be a string or RegExp.`);
		}

		return true;
	}
}

export { EndpointRegistry };
