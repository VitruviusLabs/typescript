import type { Dirent } from "node:fs";
import type { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";
import type { EndpointEntryInterface } from "./definition/interface/endpoint-entry.interface.mjs";
import type { EndpointDetailsInterface } from "./definition/interface/endpoint-details.interface.mjs";
import type { EndpointMatchInterface } from "./definition/interface/endpoint-match.interface.mjs";
import { isFunction, isRecord } from "@vitruvius-labs/ts-predicate/type-guard";
import { type ConstructorOf, getConstructorOf } from "@vitruvius-labs/ts-predicate/helper";
import { HelloWorldEndpoint } from "../../endpoint/hello-world.endpoint.mjs";
import { FileSystemService } from "../../service/file-system/file-system.service.mjs";
import { LoggerProxy } from "../../service/logger/logger.proxy.mjs";
import { BaseEndpoint } from "./base.endpoint.mjs";

/**
 * Endpoint registry.
 *
 * @sealed
 */
class EndpointRegistry
{
	private static readonly ENDPOINTS: Map<string, EndpointEntryInterface> = new Map();

	/**
	 * Find an endpoint that matches the given method and path.
	 *
	 * @internal
	 */
	public static FindEndpoint(request_method: HTTPMethodEnum, request_path: string): EndpointMatchInterface | undefined
	{
		if (EndpointRegistry.ENDPOINTS.size === 0)
		{
			LoggerProxy.Warning("No endpoint have been added. Default endpoint.");

			return {
				endpoint: new HelloWorldEndpoint(),
				matchGroups: undefined,
				contextual: true,
			};
		}

		for (const [, ENDPOINT_ENTRY] of EndpointRegistry.ENDPOINTS)
		{
			if (ENDPOINT_ENTRY.method !== request_method)
			{
				continue;
			}

			const MATCHES: RegExpMatchArray | null = ENDPOINT_ENTRY.route.exec(request_path);

			if (MATCHES === null)
			{
				continue;
			}

			if (ENDPOINT_ENTRY.endpoint instanceof BaseEndpoint)
			{
				return {
					endpoint: ENDPOINT_ENTRY.endpoint,
					contextual: false,
					matchGroups: MATCHES.groups,
				};
			}

			return {
				endpoint: new ENDPOINT_ENTRY.endpoint(),
				contextual: true,
				matchGroups: MATCHES.groups,
			};
		}

		return undefined;
	}

	/**
	 * Add an endpoint.
	 *
	 * @remarks
	 * If given an endpoint constructor, it will be instantiated for every matching request.
	 * If given an endpoint instance, it will be reused as is for every matching request.
	 */
	public static AddEndpoint(endpoint: BaseEndpoint | ConstructorOf<BaseEndpoint>): void
	{
		const DETAILS: EndpointDetailsInterface = EndpointRegistry.GetEndpointDetails(endpoint);

		if (EndpointRegistry.IsAbstractEndpoint(DETAILS.instance))
		{
			throw new Error("Endpoint is missing properties method and route.");
		}

		EndpointRegistry.AppendEndpoint(DETAILS);
	}

	/**
	 * Recursively explore a folder and add all endpoints found.
	 *
	 * @remarks
	 * Endpoint exporting files are identified by their name containing ".endpoint.".
	 * Abstract endpoints without method nor route will be ignored
	 * If the exported endpoint is a constructor, it will be instantiated for every matching request.
	 * If the exported endpoint is an instance, it will be reused as is for every matching request.
	 */
	public static async AddEndpointsDirectory(directory: string): Promise<void>
	{
		await FileSystemService.AssertDirectoryExistence(directory);

		await EndpointRegistry.ParseDirectoryForEndpoints(directory);
	}

	private static AppendEndpoint(details: EndpointDetailsInterface): void
	{
		const METHOD: HTTPMethodEnum = details.instance.getMethod();
		const ROUTE: RegExp = details.instance.getRoute();

		const IDENTIFIER: string = `${METHOD}::${ROUTE.toString()}`;

		const ENTRY: EndpointEntryInterface | undefined = EndpointRegistry.ENDPOINTS.get(IDENTIFIER);

		if (ENTRY !== undefined)
		{
			if (ENTRY.endpoint === details.endpoint)
			{
				throw new Error(`Endpoint ${details.constructor.name} already added.`);
			}

			throw new Error(`An endpoint is already added for method ${METHOD} and route "${ROUTE.toString()}".`);
		}

		LoggerProxy.Debug(`Endpoint added ${METHOD} ${ROUTE.toString()}.`);

		EndpointRegistry.ENDPOINTS.set(
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
				await EndpointRegistry.ParseDirectoryForEndpoints(ENTITY_PATH);

				continue;
			}

			if (ENTITY.isFile() && ENTITY.name.includes(".endpoint."))
			{
				await EndpointRegistry.ExtractEndpoint(ENTITY_PATH);
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
				if (EndpointRegistry.IsEndpoint(EXPORT))
				{
					const DETAILS: EndpointDetailsInterface = EndpointRegistry.GetEndpointDetails(EXPORT);

					if (EndpointRegistry.IsAbstractEndpoint(DETAILS.instance))
					{
						continue;
					}

					EndpointRegistry.AppendEndpoint(DETAILS);
				}
			}
		}
	}

	private static GetEndpointDetails(endpoint: BaseEndpoint | ConstructorOf<BaseEndpoint>): EndpointDetailsInterface
	{
		if (endpoint instanceof BaseEndpoint)
		{
			return {
				endpoint: endpoint,
				constructor: getConstructorOf(endpoint),
				instance: endpoint,
			};
		}

		return {
			endpoint: endpoint,
			constructor: endpoint,
			instance: new endpoint(),
		};
	}

	private static IsEndpoint(value: unknown): value is BaseEndpoint | ConstructorOf<BaseEndpoint>
	{
		return value instanceof BaseEndpoint || isFunction(value) && value.prototype instanceof BaseEndpoint;
	}

	private static IsAbstractEndpoint(endpoint: BaseEndpoint): boolean
	{
		return Reflect.get(endpoint, "method") === undefined && Reflect.get(endpoint, "route") === undefined;
	}
}

export { EndpointRegistry };
