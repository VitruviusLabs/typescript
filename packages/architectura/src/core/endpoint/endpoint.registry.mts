import type { Dirent } from "node:fs";
import type { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";
import type { EndpointEntryInterface } from "./definition/interface/endpoint-entry.interface.mjs";
import type { EndpointDetailsInterface } from "./definition/interface/endpoint-details.interface.mjs";
import { isFunction, isRecord } from "@vitruvius-labs/ts-predicate/type-guard";
import { type ConstructorOf, getConstructorOf } from "@vitruvius-labs/ts-predicate/helper";
import { HelloWorldEndpoint } from "../../endpoint/hello-world.endpoint.mjs";
import { FileSystemService } from "../../service/file-system/file-system.service.mjs";
import { LoggerProxy } from "../../service/logger/logger.proxy.mjs";
import { BaseEndpoint } from "./base.endpoint.mjs";

class EndpointRegistry
{
	private static readonly ENDPOINTS: Map<string, EndpointEntryInterface> = new Map();

	public static FindEndpoint(request_method: HTTPMethodEnum, request_path: string): BaseEndpoint | undefined
	{
		if (this.ENDPOINTS.size === 0)
		{
			LoggerProxy.Warning("No endpoint have been added. Default endpoint.");

			return new HelloWorldEndpoint();
		}

		for (const [, ENDPOINT_ENTRY] of this.ENDPOINTS)
		{
			if (ENDPOINT_ENTRY.method === request_method && ENDPOINT_ENTRY.route.test(request_path))
			{
				if (ENDPOINT_ENTRY.endpoint instanceof BaseEndpoint)
				{
					return ENDPOINT_ENTRY.endpoint;
				}

				return new ENDPOINT_ENTRY.endpoint();
			}
		}

		return undefined;
	}

	public static AddEndpoint(endpoint: BaseEndpoint | ConstructorOf<BaseEndpoint>): void
	{
		const DETAILS: EndpointDetailsInterface = this.GetEndpointDetails(endpoint);

		if (this.IsAbstractEndpoint(DETAILS.instance))
		{
			throw new Error("Endpoint is missing properties method and route.");
		}

		this.AppendEndpoint(DETAILS);
	}

	public static async AddEndpointsDirectory(directory: string): Promise<void>
	{
		await FileSystemService.ConfirmDirectoryExistence(directory);

		await EndpointRegistry.ParseDirectoryForEndpoints(directory);
	}

	private static AppendEndpoint(details: EndpointDetailsInterface): void
	{
		const METHOD: HTTPMethodEnum = details.instance.getMethod();
		const ROUTE: RegExp = details.instance.getRoute();

		const IDENTIFIER: string = `${METHOD}::${ROUTE.toString()}`;

		const ENTRY: EndpointEntryInterface | undefined = this.ENDPOINTS.get(IDENTIFIER);

		if (ENTRY !== undefined)
		{
			if (ENTRY.endpoint === details.endpoint)
			{
				throw new Error(`Endpoint ${details.constructor.name} already added.`);
			}

			throw new Error(`An endpoint is already added for method ${METHOD} and route "${ROUTE.toString()}".`);
		}

		LoggerProxy.Debug(`Endpoint added ${METHOD} ${ROUTE.toString()}.`);

		this.ENDPOINTS.set(
			IDENTIFIER,
			{
				method: METHOD,
				route: ROUTE,
				endpoint: details.endpoint,
			}
		);
	}

	private static async ParseDirectoryForEndpoints(directory: string): Promise<void>
	{
		const ENTITIES: Array<Dirent> = await FileSystemService.ReadDirectory(directory);

		for (const ENTITY of ENTITIES)
		{
			const ENTITY_PATH: string = `${directory}/${ENTITY.name}`;

			if (ENTITY.isDirectory())
			{
				await this.ParseDirectoryForEndpoints(ENTITY_PATH);

				continue;
			}

			if (ENTITY.isFile() && ENTITY.name.includes(".endpoint."))
			{
				await this.ExtractEndpoint(ENTITY_PATH);
			}
		}
	}

	private static async ExtractEndpoint(path: string): Promise<void>
	{
		const EXPORTS: unknown = await FileSystemService.Import(path);

		if (isRecord(EXPORTS))
		{
			for (const [, EXPORT] of Object.entries(EXPORTS))
			{
				if (this.IsEndpoint(EXPORT))
				{
					const DETAILS: EndpointDetailsInterface = this.GetEndpointDetails(EXPORT);

					if (this.IsAbstractEndpoint(DETAILS.instance))
					{
						continue;
					}

					this.AppendEndpoint(DETAILS);
				}
			}
		}
	}

	private static GetEndpointDetails(endpoint: BaseEndpoint | ConstructorOf<BaseEndpoint>): EndpointDetailsInterface
	{
		let constructor_class: ConstructorOf<BaseEndpoint> | undefined = undefined;
		let instance: BaseEndpoint | undefined = undefined;

		if (endpoint instanceof BaseEndpoint)
		{
			constructor_class = getConstructorOf(endpoint);
			instance = endpoint;
		}
		else
		{
			constructor_class = endpoint;
			instance = new endpoint();
		}

		return {
			endpoint: endpoint,
			constructor: constructor_class,
			instance: instance,
		};
	}

	private static IsEndpoint(value: unknown): value is BaseEndpoint | ConstructorOf<BaseEndpoint>
	{
		return value instanceof BaseEndpoint || isFunction(value) && value.prototype instanceof BaseEndpoint;
	}

	private static IsAbstractEndpoint(endpoint: BaseEndpoint): boolean
	{
		return (
			Reflect.get(endpoint, "method") === undefined
			&& Reflect.get(endpoint, "route") === undefined
		);
	}
}

export { EndpointRegistry };
