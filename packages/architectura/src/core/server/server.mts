import type { ServerConfigurationType } from "./definition/type/server-configuration.type.mjs";
import type { ServerInstantiationType } from "./definition/type/server-instantiation.type.mjs";
import type { BasePostHook } from "../../hook/base.post-hook.mjs";
import type { BasePreHook } from "../../hook/base.pre-hook.mjs";
import type { BaseEndpoint } from "../endpoint/base.endpoint.mjs";
import { Server as UnsafeServer, type ServerOptions as UnsafeServerOptions } from "node:http";
import { Server as SecureServer, type ServerOptions as SecureServerOptions } from "node:https";
import { extname } from "node:path";
import { Helper, TypeAssertion } from "@vitruvius-labs/ts-predicate";
import { FileSystemService } from "../../service/file-system/file-system.service.mjs";
import { LoggerProxy } from "../../service/logger/logger.proxy.mjs";
import { EndpointRegistry } from "../endpoint/endpoint.registry.mjs";
import { ExecutionContext } from "../execution-context/execution-context.mjs";
import { ExecutionContextRegistry } from "../execution-context/execution-context.registry.mjs";
import { HTTPStatusCodeEnum } from "./definition/enum/http-status-code.enum.mjs";
import { PortsEnum } from "./definition/enum/ports.enum.mjs";
import { RichClientRequest } from "./rich-client-request.mjs";
import { RichServerResponse } from "./rich-server-response.mjs";
import { ContentType } from "../../utility/content-type/content-type.mjs";

class Server
{
	private static readonly PUBLIC_DIRECTORIES: Map<string, string> = new Map<string, string>();
	private static readonly GLOBAL_PRE_HOOKS: Array<BasePreHook> = [];
	private static readonly GLOBAL_POST_HOOKS: Array<BasePostHook> = [];

	private readonly port: number = PortsEnum.DEFAULT_HTTPS;
	private readonly https: boolean = false;
	private readonly nativeServer: (
		// @ts-expect-error: It can't be incompatible
		| SecureServer<typeof RichClientRequest, typeof RichServerResponse>
		// @ts-expect-error: It can't be incompatible
		| UnsafeServer<typeof RichClientRequest, typeof RichServerResponse>
	);

	/**
	 * constructor
	 */
	private constructor(options: ServerInstantiationType)
	{
		Server.ValidatePort(options.port);

		this.https = options.https;
		this.port = options.port;

		if (!options.https)
		{
			// @ts-expect-error: It can't be incompatible
			const UNSAFE_OPTIONS: UnsafeServerOptions<typeof RichClientRequest, typeof RichServerResponse> = {
				IncomingMessage: RichClientRequest,
				ServerResponse: RichServerResponse,
			};

			// @ts-expect-error: It can't be incompatible
			this.nativeServer = new UnsafeServer(UNSAFE_OPTIONS);

			return;
		}

		// @ts-expect-error: It can't be incompatible
		const SECURE_OPTIONS: SecureServerOptions<typeof RichClientRequest, typeof RichServerResponse> = {
			IncomingMessage: RichClientRequest,
			ServerResponse: RichServerResponse,
			cert: options.certificate,
			key: options.key,
		};

		// @ts-expect-error: It can't be incompatible
		this.nativeServer = new SecureServer(SECURE_OPTIONS);
	}

	/**
	 * Create
	 */
	public static async Create(options: ServerConfigurationType): Promise<Server>
	{
		const CONTEXT_CONSTRUCTOR: typeof ExecutionContext = options.contextConstructor ?? ExecutionContext;

		const OPTIONS: ServerInstantiationType = await this.ComputeServerOptions(options);

		const SERVER: Server = new Server(OPTIONS);

		SERVER.nativeServer.on(
			"request",
			// eslint-disable-next-line @typescript-eslint/no-misused-promises -- Necessary floating promise
			async (request: RichClientRequest, response: RichServerResponse): Promise<void> =>
			{
				await this.DefaultListener(request, response, CONTEXT_CONSTRUCTOR);
			}
		);

		return SERVER;
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
		if (!await FileSystemService.DirectoryExists(directory))
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

	private static async ComputeServerOptions(options: ServerConfigurationType): Promise<ServerInstantiationType>
	{
		if (!options.https)
		{
			return options;
		}

		const SECURE_OPTIONS: ServerInstantiationType = {
			...options,
			certificate: await FileSystemService.ReadTextFile(options.certificate),
			key: await FileSystemService.ReadTextFile(options.key),
		};

		return SECURE_OPTIONS;
	}

	private static async DefaultListener(
		request: RichClientRequest,
		response: RichServerResponse,
		context_constructor: typeof ExecutionContext
	): Promise<void>
	{
		request.initialise();

		const CONTEXT: ExecutionContext = new context_constructor({
			request: request,
			response: response,
		});

		for (const [ROUTE, DIRECTORY] of this.PUBLIC_DIRECTORIES)
		{
			const ROUTE_REGEXP: RegExp = new RegExp(ROUTE);

			if (ROUTE_REGEXP.exec(request.getRequestedPath()) !== null)
			{
				// eslint-disable-next-line @stylistic/js/newline-per-chained-call -- Simple case
				const FILE_PATH: string = request.getRequestedPath().replace(ROUTE_REGEXP, "").padStart(1, "/");

				if (!await FileSystemService.FileExists(`${DIRECTORY}${FILE_PATH}`))
				{
					continue;
				}

				const FILE: Buffer = await FileSystemService.ReadFileAsBuffer(`${DIRECTORY}${FILE_PATH}`);

				const CONTENT_TYPE: string = ContentType.Get(extname(FILE_PATH));

				CONTEXT.getResponse().replyWith({
					payload: FILE,
					contentType: CONTENT_TYPE,
				});

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

				await ENDPOINT.execute(CONTEXT);

				await this.RunPostHooks(ENDPOINT);

				if (!response.writableEnded)
				{
					response.send();
				}

				return;
			}
		}

		response.statusCode = HTTPStatusCodeEnum.NOT_FOUND;
		response.write("Not found.");
		response.end();
	}

	private static async RunPreHooks(endpoint: BaseEndpoint): Promise<void>
	{
		for (const HOOK of this.GLOBAL_PRE_HOOKS)
		{
			if (endpoint.getExcludedGlobalPreHooks().includes(Helper.getConstructorOf(HOOK)))
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
			if (endpoint.getExcludedGlobalPostHooks().includes(Helper.getConstructorOf(HOOK)))
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
	 * ValidatePort
	 */
	private static ValidatePort(port: number): void
	{
		TypeAssertion.isInteger(port);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- range boundaries
		if (port < PortsEnum.LOWEST_AVAILABLE || PortsEnum.HIGHEST_AVAILABLE < port)
		{
			throw new Error(`"port" parameter isn't within range of valid ports. It must be an integer between ${PortsEnum.LOWEST_AVAILABLE.toString()} and ${PortsEnum.HIGHEST_AVAILABLE.toString()}`);
		}
	}

	/**
	 * start
	 */
	public start(): void
	{
		this.nativeServer.listen(this.port);
		LoggerProxy.Informational("Server started.");
	}

	/**
	 * isHTTPS
	 */
	public isHTTPS(): boolean
	{
		return this.https;
	}
}

export { Server };
