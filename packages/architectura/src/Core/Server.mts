import { Server as HTTPServer, type RequestListener } from "node:http";

import { Server as HTTPSServer } from "node:https";

import { Dispatcher } from "../Service/Dispatcher.mjs";

import { FileSystem } from "../Service/FileSystem.mjs";

import { Logger } from "../Service/logger.service.mjs";

import { getConstructorOf } from "../utils/getConstructorOf.mjs";

import { ExecutionContext } from "./ExecutionContext.mjs";

import { HTTPStatusCodeEnum } from "./HTTP/HTTPStatusCodeEnum.mjs";

import { Kernel } from "./Kernel.mjs";

import { RichClientRequest } from "./RichClientRequest.mjs";

import { RichServerResponse } from "./RichServerResponse.mjs";

import { PortsEnum } from "./Server/PortsEnum.mjs";

import type { ServerConfigurationType } from "./Server/ServerConfigurationType.mjs";

import type { ServerInstantiationType } from "./Server/ServerInstantiationType.mjs";

import type { BaseEndpoint, BasePostHook, BasePreHook } from "../index.mjs";

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

		const CERTIFICATE: string = await FileSystem.ReadTextFile(options.certificate);
		const KEY: string = await FileSystem.ReadTextFile(options.key);

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

				if (!(await FileSystem.FileExists(`${DIRECTORY}${FILE_PATH}`)))
				{
					continue;
				}

				const FILE: Buffer = await FileSystem.ReadFileAsBuffer(`${DIRECTORY}${FILE_PATH}`);

				CONTEXT.getResponse().send(FILE);

				return;
			}
		}

		Kernel.SetExecutionContext(CONTEXT);

		const ENDPOINTS: Map<string, BaseEndpoint> = Dispatcher.GetEndpoints();

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
		if (!(await FileSystem.DirectoryExists(directory)))
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
		Logger.Informational("Server started.");
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
