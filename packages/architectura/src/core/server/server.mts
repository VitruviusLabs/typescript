import type { ServerConfigurationType } from "./definition/type/server-configuration.type.mjs";
import type { ServerInstantiationType } from "./definition/type/server-instantiation.type.mjs";
import type { BaseEndpoint } from "../endpoint/base.endpoint.mjs";
import type { BasePreHook } from "../hook/base.pre-hook.mjs";
import type { BasePostHook } from "../hook/base.post-hook.mjs";
import type { BaseErrorHook } from "../hook/base.error-hook.mjs";
import { Server as UnsafeServer, type ServerOptions as UnsafeServerOptions } from "node:http";
import { Server as SecureServer, type ServerOptions as SecureServerOptions } from "node:https";
import { extname } from "node:path";
import { getConstructorOf } from "@vitruvius-labs/ts-predicate/helper";
import { assertInteger } from "@vitruvius-labs/ts-predicate/type-assertion";
import { isString } from "@vitruvius-labs/ts-predicate/type-guard";
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
import { GlobalConfiguration } from "./global-configuration.mjs";
import { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";

class Server
{
	private readonly port: number = PortsEnum.DEFAULT_HTTPS;
	private readonly https: boolean = false;
	private readonly nativeServer: (
		// @ts-expect-error: It can't be incompatible
		| SecureServer<typeof RichClientRequest, typeof RichServerResponse>
		// @ts-expect-error: It can't be incompatible
		| UnsafeServer<typeof RichClientRequest, typeof RichServerResponse>
	);

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

	public static async Create(options: ServerConfigurationType): Promise<Server>
	{
		const OPTIONS: ServerInstantiationType = await this.ComputeServerOptions(options);

		const SERVER: Server = new Server(OPTIONS);

		SERVER.nativeServer.addListener(
			"request",
			// eslint-disable-next-line @typescript-eslint/no-misused-promises -- Asynchronous event listener
			async (request: RichClientRequest, response: RichServerResponse): Promise<void> =>
			{
				try
				{
					await this.DefaultListener(request, response);
				}
				catch (error: unknown)
				{
					await this.HandleError(error);
				}
			}
		);

		return SERVER;
	}

	public static async HandleError(error: unknown): Promise<void>
	{
		const CONTEXT: ExecutionContext | undefined = ExecutionContextRegistry.GetUnsafeExecutionContext();

		if (CONTEXT === undefined)
		{
			if (error instanceof Error)
			{
				LoggerProxy.Error(error);

				return;
			}

			LoggerProxy.Error("An unknown error occurred.");

			return;
		}

		for (const HOOK of GlobalConfiguration.GetGlobalErrorHooks())
		{
			await HOOK.execute(CONTEXT, error);
		}

		this.FinalizeResponse(CONTEXT, true);
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

	private static async DefaultListener(request: RichClientRequest, response: RichServerResponse): Promise<void>
	{
		LoggerProxy.Debug(`Incoming request "${request.url ?? ""}".`);

		request.initialize();

		const CONTEXT: ExecutionContext = new ExecutionContext({
			request: request,
			response: response,
		});

		ExecutionContextRegistry.SetExecutionContext(CONTEXT);

		const IS_PUBLIC_ASSET: boolean = await this.HandlePublicAssets(CONTEXT);

		if (IS_PUBLIC_ASSET)
		{
			return;
		}

		const IS_ENDPOINT: boolean = await this.HandleEndpoints(CONTEXT);

		if (IS_ENDPOINT)
		{
			return;
		}

		response.writeHead(HTTPStatusCodeEnum.NOT_FOUND);
		response.write("404 - Not found.");
		response.end();
	}

	private static async HandlePublicAssets(context: ExecutionContext): Promise<boolean>
	{
		if (context.getRequest().getMethod() !== HTTPMethodEnum.GET)
		{
			return false;
		}

		const FILE_PATH: string | undefined = await this.FindPublicAsset(context.getRequest());

		if (FILE_PATH === undefined)
		{
			return false;
		}

		LoggerProxy.Debug(`Public asset found "${FILE_PATH}".`);

		const FILE: Buffer = await FileSystemService.ReadFileAsBuffer(FILE_PATH);

		const CONTENT_TYPE: string = ContentType.Get(extname(FILE_PATH));

		await context.getResponse().replyWith({
			payload: FILE,
			contentType: CONTENT_TYPE,
		});

		return true;
	}

	private static async FindPublicAsset(request: RichClientRequest): Promise<string | undefined>
	{
		const REQUEST_PATH: string = request.getPath();

		for (const [ROUTE, DIRECTORY] of GlobalConfiguration.GetPublicAssetDirectories())
		{
			const ROUTE_REGEXP: RegExp = new RegExp(ROUTE);

			if (ROUTE_REGEXP.exec(REQUEST_PATH) !== null)
			{
				const FILE_PATH: string = REQUEST_PATH.replace(ROUTE_REGEXP, "").padStart(1, "/");

				if (await FileSystemService.FileExists(`${DIRECTORY}${FILE_PATH}`))
				{
					return `${DIRECTORY}${FILE_PATH}`;
				}
			}
		}

		return undefined;
	}

	private static async HandleEndpoints(context: ExecutionContext): Promise<boolean>
	{
		const ENDPOINT: BaseEndpoint | undefined = this.FindMatchingEndpoint(context.getRequest());

		if (ENDPOINT === undefined)
		{
			return false;
		}

		LoggerProxy.Debug(`Matching endpoint found: ${ENDPOINT.constructor.name}.`);

		try
		{
			await this.RunPreHooks(ENDPOINT, context);
			await ENDPOINT.execute(context);
			await this.RunPostHooks(ENDPOINT, context);

			this.FinalizeResponse(context, false);
		}
		catch (error: unknown)
		{
			if (isString(error) || error instanceof Error)
			{
				LoggerProxy.Error(error);
			}
			else
			{
				LoggerProxy.Error("Non-Error thrown.");
			}

			await this.RunErrorHooks(ENDPOINT, context, error);

			this.FinalizeResponse(context, true);
		}

		return true;
	}

	private static FindMatchingEndpoint(request: RichClientRequest): BaseEndpoint | undefined
	{
		const REQUEST_METHOD: string | undefined = request.getMethod();
		const REQUEST_PATH: string = request.getPath();
		const ENDPOINTS: ReadonlyMap<string, BaseEndpoint> = EndpointRegistry.GetEndpoints();

		for (const [, ENDPOINT] of ENDPOINTS)
		{
			if (ENDPOINT.getMethod() !== REQUEST_METHOD)
			{
				continue;
			}

			const ROUTE: RegExp = ENDPOINT.getRoute();

			const MATCHES: RegExpMatchArray | null = REQUEST_PATH.match(ROUTE);

			if (MATCHES !== null)
			{
				Reflect.set(request, "pathMatchGroups", MATCHES.groups);

				return ENDPOINT;
			}
		}

		return undefined;
	}

	private static async RunPreHooks(endpoint: BaseEndpoint, context: ExecutionContext): Promise<void>
	{
		const EXCLUDED_HOOKS: Array<typeof BasePreHook> = endpoint.getExcludedGlobalPreHooks();

		for (const HOOK of GlobalConfiguration.GetGlobalPreHooks())
		{
			if (EXCLUDED_HOOKS.includes(getConstructorOf(HOOK)))
			{
				continue;
			}

			await HOOK.execute(context);
		}

		for (const HOOK of endpoint.getPreHooks())
		{
			await HOOK.execute(context);
		}
	}

	private static async RunPostHooks(endpoint: BaseEndpoint, context: ExecutionContext): Promise<void>
	{
		const EXCLUDED_HOOKS: Array<typeof BasePostHook> = endpoint.getExcludedGlobalPostHooks();

		for (const HOOK of GlobalConfiguration.GetGlobalPostHooks())
		{
			if (EXCLUDED_HOOKS.includes(getConstructorOf(HOOK)))
			{
				continue;
			}

			await HOOK.execute(context);
		}

		for (const HOOK of endpoint.getPostHooks())
		{
			await HOOK.execute(context);
		}
	}

	private static async RunErrorHooks(endpoint: BaseEndpoint, context: ExecutionContext, error: unknown): Promise<void>
	{
		const EXCLUDED_HOOKS: Array<typeof BaseErrorHook> = endpoint.getExcludedGlobalErrorHooks();

		for (const HOOK of GlobalConfiguration.GetGlobalErrorHooks())
		{
			if (EXCLUDED_HOOKS.includes(getConstructorOf(HOOK)))
			{
				continue;
			}

			await HOOK.execute(context, error);
		}

		for (const HOOK of endpoint.getErrorHooks())
		{
			await HOOK.execute(context, error);
		}
	}

	private static FinalizeResponse(context: ExecutionContext, is_error: boolean): void
	{
		const RESPONSE: RichServerResponse = context.getResponse();

		if (!RESPONSE.areHeadersSent())
		{
			LoggerProxy.Error(is_error ? "Unhandled server error." : "Unhandled response.");

			RESPONSE.getHeaderNames().forEach(
				(header: string): void =>
				{
					RESPONSE.removeHeader(header);
				}
			);

			RESPONSE.writeHead(HTTPStatusCodeEnum.INTERNAL_SERVER_ERROR);
			RESPONSE.write("500 - Internal Server Error.");
			RESPONSE.end();

			return;
		}

		if (!RESPONSE.isDone())
		{
			LoggerProxy.Error("Unfinished server response.");
			RESPONSE.end();
		}
	}

	private static ValidatePort(port: number): void
	{
		assertInteger(port);

		if (port < PortsEnum.LOWEST_AVAILABLE || PortsEnum.HIGHEST_AVAILABLE < port)
		{
			throw new Error(`"port" parameter isn't within range of valid ports. It must be an integer between ${PortsEnum.LOWEST_AVAILABLE.toString()} and ${PortsEnum.HIGHEST_AVAILABLE.toString()}`);
		}
	}

	public start(): void
	{
		this.nativeServer.listen(this.port);
		LoggerProxy.Informational("Server started.");
	}

	public isHTTPS(): boolean
	{
		return this.https;
	}
}

export { Server };
