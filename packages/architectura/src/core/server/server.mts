import { Server as HTTPServer, type RequestListener } from "node:http";

import { Server as HTTPSServer } from "node:https";

import { HTTPStatusCodeEnum } from "../../definition/enum/http-status-code.enum.mjs";

import { PortsEnum } from "../../definition/enum/ports.enum.mjs";

import { getConstructorOf } from "../../definition/type/get-constructor-of.type.mjs";

import { EndpointRegistry } from "../../service/dispatcher/endpoint.registry.mjs";

import { FileSystemService } from "../../service/file-system/file-system.service.mjs";

import { LoggerProxy } from "../../service/logger/logger.proxy.mjs";

import { ExecutionContext } from "../execution-context/execution-context.mjs";

import { ExecutionContextRegistry } from "../execution-context/execution-context.registry.mjs";

import { RichClientRequest } from "./rich-client-request.mjs";

import { RichServerResponse } from "./rich-server-response.mjs";

import type { ServerConfigurationType } from "../../definition/type/server-configuration.type.mjs";

import type { ServerInstantiationType } from "../../definition/type/server-instantiation.type.mjs";

import type { BaseEndpoint } from "../../endpoint/base.endpoint.mjs";

import type { BasePostHook } from "../../hook/base.post-hook.mjs";

import type { BasePreHook } from "../../hook/base.pre-hook.mjs";

class Server
{
	private static readonly PUBLIC_DIRECTORIES: Map<string, string> = new Map<string, string>();
	private static readonly GLOBAL_PRE_HOOKS: Array<BasePreHook> = [];
	private static readonly GLOBAL_POST_HOOKS: Array<BasePostHook> = [];

	private port: number = PortsEnum.DEFAULT_HTTPS;
	private readonly https: boolean = false;
	private readonly server: HTTPServer | HTTPSServer;

	/**
	 * constructor
	 */
	private constructor(options: ServerInstantiationType, listener: RequestListener)
	{
		this.https = options.https;
		this.port = options.port;

		if (options.https)
		{
			this.server = new HTTPSServer(
				{
					cert: options.certificate,
					key: options.key,
					IncomingMessage: RichClientRequest,
					// @ts-expect-error: Incorrectly believe the request is not overloaded
					ServerResponse: RichServerResponse
				},
				listener
			);

			return;
		}

		this.server = new HTTPServer(
			{
				IncomingMessage: RichClientRequest,
				// @ts-expect-error: Incorrectly believe the request is not overloaded
				ServerResponse: RichServerResponse
			},
			listener
		);
	}

	/**
	 * Create
	 */
	public static async Create(options: ServerConfigurationType): Promise<Server>
	{
		const CONTEXT_CONSTRUCTOR: typeof ExecutionContext = options.contextConstructor ?? ExecutionContext;

		if (!options.https)
		{
			const HTTP_SERVER: Server = new Server(
				options,
				// @ts-expect-error - This is a very specific case where TypeScript cannot know that Node.JS will use our custom class instead of IncomingMessage.
				async (request: RichClientRequest, response: RichServerResponse): Promise<void> =>
				{
					await this.DefaultListener(request, response, CONTEXT_CONSTRUCTOR);
				}
			);

			return HTTP_SERVER;
		}

		const CERTIFICATE: string = await FileSystemService.ReadTextFile(options.certificate);
		const KEY: string = await FileSystemService.ReadTextFile(options.key);

		const HTTPS_SERVER: Server = new Server(
			{
				...options,
				certificate: CERTIFICATE,
				key: KEY
			},
			// @ts-expect-error - This is a very specific case where TypeScript cannot know that Node.JS will use our custom class instead of IncomingMessage.
			async (request: RichClientRequest, response: RichServerResponse): Promise<void> =>
			{
				await this.DefaultListener(request, response, CONTEXT_CONSTRUCTOR);
			}
		);

		return HTTPS_SERVER;
	}

	public static async DefaultListener(
		request: RichClientRequest,
		response: RichServerResponse,
		context_constructor: typeof ExecutionContext,
	): Promise<void>
	{
		request.initialise();

		const CONTEXT: ExecutionContext = new context_constructor({
			request: request,
			response: response
		});

		for (const [ROUTE, DIRECTORY] of this.PUBLIC_DIRECTORIES)
		{
			const ROUTE_REGEXP: RegExp = new RegExp(ROUTE);

			if (ROUTE_REGEXP.exec(request.getRequestedPath()) !== null)
			{
				const FILE_PATH: string = request.getRequestedPath().replace(ROUTE_REGEXP, "").padStart(1, "/");

				if (!(await FileSystemService.FileExists(`${DIRECTORY}${FILE_PATH}`)))
				{
					continue;
				}

				const FILE: Buffer = await FileSystemService.ReadFileAsBuffer(`${DIRECTORY}${FILE_PATH}`);

				CONTEXT.getResponse().send(FILE);

				return;
			}
		}

		ExecutionContextRegistry.SetExecutionContext(CONTEXT);

		const ENDPOINTS: Map<string, BaseEndpoint> = EndpointRegistry.GetEndpoints();

		for (const [, ENDPOINT] of ENDPOINTS)
		{
			if (new RegExp(ENDPOINT.getRoute()).test(request.getRequestedPath()))
			{
				// @TODO: handle errors

				await this.RunPreHooks(ENDPOINT);

				await ENDPOINT.execute();

				await this.RunPostHooks(ENDPOINT);

				return;
			}
		}

		response.statusCode = HTTPStatusCodeEnum.NOT_FOUND;
		response.write("Not found.");
		response.end();
	}

	public static GetPublicDirectories(): Map<string, string>
	{
		return this.PUBLIC_DIRECTORIES;
	}

	/**
	 * AddPublicDirectory
	 */
	public static async AddPublicDirectory(route: string, directory: string): Promise<void>
	{
		if (!(await FileSystemService.DirectoryExists(directory)))
		{
			throw new Error(`Impossible to add directory ${directory} as a public directory as it does not exist.`);
		}

		this.PUBLIC_DIRECTORIES.set(route, directory);
	}

	/**
	 * SetPublicDirectories
	 */
	public static async SetPublicDirectories(directories: Map<string, string>): Promise<void>
	{
		for (const [ROUTE, DIRECTORY] of directories)
		{
			await this.AddPublicDirectory(ROUTE, DIRECTORY);
		}
	}

	/**
	 * AddGlobalPreHook
	 */
	public static AddGlobalPreHook(hook: BasePreHook): void
	{
		this.GLOBAL_PRE_HOOKS.push(hook);
	}

	/**
	 * AddGlobalPostHook
	 */
	public static AddGlobalPostHook(hook: BasePostHook): void
	{
		this.GLOBAL_POST_HOOKS.push(hook);
	}

	private static async RunPreHooks(endpoint: BaseEndpoint): Promise<void>
	{
		for (const HOOK of this.GLOBAL_PRE_HOOKS)
		{
			if (endpoint.getExcludedGlobalPreHooks().includes(getConstructorOf(HOOK)))
			{
				continue;
			}

			await HOOK.execute();
		}

		for (const HOOK of endpoint.getPreHooks())
		{
			await HOOK.execute();
		}
	}

	private static async RunPostHooks(endpoint: BaseEndpoint): Promise<void>
	{
		for (const HOOK of this.GLOBAL_POST_HOOKS)
		{
			if (endpoint.getExcludedGlobalPostHooks().includes(getConstructorOf(HOOK)))
			{
				continue;
			}

			await HOOK.execute();
		}

		for (const HOOK of endpoint.getPostHooks())
		{
			await HOOK.execute();
		}
	}

	/**
	 * start
	 */
	public start(): void
	{
		this.server.listen(this.port);
		LoggerProxy.Informational("Server started.");
	}

	public getHTTPS(): boolean
	{
		return this.https;
	}

	/**
	 * setPort
	 */
	public setPort(port: number): void
	{
		if (!Number.isInteger(port) || port < PortsEnum.LOWEST_AVAILABLE || port > PortsEnum.HIGHEST_AVAILABLE)
		{
			throw new Error(`"port" parameter isn't within range of valid ports. It must be an integer between ${PortsEnum.LOWEST_AVAILABLE.toString()} and ${PortsEnum.HIGHEST_AVAILABLE.toString()}`);
		}

		this.port = port;
	}
}

export { Server };
