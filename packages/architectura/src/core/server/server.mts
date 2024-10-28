import type { ServerConfigurationType } from "./definition/type/server-configuration.type.mjs";
import type { ServerInstantiationType } from "./definition/type/server-instantiation.type.mjs";
import type { EndpointMatchInterface } from "../endpoint/definition/interface/endpoint-match.interface.mjs";
import type { BaseEndpoint } from "../endpoint/base.endpoint.mjs";
import { Server as UnsafeServer, type ServerOptions as UnsafeServerOptions } from "node:http";
import { Server as SecureServer, type ServerOptions as SecureServerOptions } from "node:https";
import { extname } from "node:path";
import { assertInteger } from "@vitruvius-labs/ts-predicate/type-assertion";
import { ReflectUtility } from "@vitruvius-labs/toolbox/reflect";
import { FileSystemService } from "../../service/file-system/file-system.service.mjs";
import { LoggerProxy } from "../../service/logger/logger.proxy.mjs";
import { EndpointRegistry } from "../endpoint/endpoint.registry.mjs";
import { HookService } from "../hook/hook.service.mjs";
import { AssetRegistry } from "./asset.registry.mjs";
import { ExecutionContext } from "../execution-context/execution-context.mjs";
import { ExecutionContextRegistry } from "../execution-context/execution-context.registry.mjs";
import { HTTPStatusCodeEnum } from "./definition/enum/http-status-code.enum.mjs";
import { PortsEnum } from "./definition/enum/ports.enum.mjs";
import { RichClientRequest } from "./rich-client-request.mjs";
import { RichServerResponse } from "./rich-server-response.mjs";
import { getContentType } from "../../utility/content-type/get-content-type.mjs";
import { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";

/* @TODO: Add support for HTTP/2 */

/**
 * Server class.
 *
 * @sealed
 */
class Server
{
	private readonly port: number = PortsEnum.DEFAULT_HTTPS;
	private readonly https: boolean = false;
	private readonly nativeServer: (
		| SecureServer<typeof RichClientRequest, typeof RichServerResponse>
		| UnsafeServer<typeof RichClientRequest, typeof RichServerResponse>
	);

	private constructor(options: ServerInstantiationType)
	{
		Server.ValidatePort(options.port);

		this.https = options.https;
		this.port = options.port;

		if (!options.https)
		{
			const UNSAFE_OPTIONS: UnsafeServerOptions<typeof RichClientRequest, typeof RichServerResponse> = {
				IncomingMessage: RichClientRequest,
				ServerResponse: RichServerResponse,
			};

			this.nativeServer = new UnsafeServer(UNSAFE_OPTIONS);

			return;
		}

		const SECURE_OPTIONS: SecureServerOptions<typeof RichClientRequest, typeof RichServerResponse> = {
			IncomingMessage: RichClientRequest,
			ServerResponse: RichServerResponse,
			cert: options.certificate,
			key: options.key,
		};

		this.nativeServer = new SecureServer(SECURE_OPTIONS);
	}

	/**
	 * Create a new server instance.
	 */
	public static async Create(options: ServerConfigurationType): Promise<Server>
	{
		const OPTIONS: ServerInstantiationType = await Server.ComputeServerOptions(options);

		const SERVER: Server = new Server(OPTIONS);

		SERVER.nativeServer.addListener(
			"request",
			// eslint-disable-next-line @ts/no-misused-promises -- Asynchronous event listener
			async (request: RichClientRequest, response: RichServerResponse): Promise<void> =>
			{
				try
				{
					await Server.RequestListener(request, response);
				}
				catch (error: unknown)
				{
					await Server.HandleError(error);
				}
			}
		);

		return SERVER;
	}

	/**
	 * Handle an error.
	 *
	 * @remarks
	 * - It is intended for use in event listeners when catching an error.
	 * - If you only want to log the error, use {@link LoggerProxy.Error} instead.
	 * - It will attempt to finalize the response and log the error.
	 * - It'll run all global error hooks before finalizing the response.
	 */
	public static async HandleError(error: unknown): Promise<void>
	{
		try
		{
			const CONTEXT: ExecutionContext | undefined = ExecutionContextRegistry.GetUnsafeExecutionContext();

			if (CONTEXT === undefined)
			{
				LoggerProxy.Error(error);

				return;
			}

			try
			{
				await HookService.RunFallbackErrorHooks(CONTEXT, error);
			}
			catch (scoped_error: unknown)
			{
				LoggerProxy.Error(scoped_error);
			}

			await Server.FinalizeResponse(CONTEXT, true);
		}
		catch (scoped_error: unknown)
		{
			// eslint-disable-next-line no-console -- No alternative
			console.error(scoped_error);
		}
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

	private static async RequestListener(request: RichClientRequest, response: RichServerResponse): Promise<void>
	{
		LoggerProxy.Debug(`Incoming request "${request.url ?? ""}".`);

		request.initialize();

		const CONTEXT: ExecutionContext = ExecutionContext.Create({
			request: request,
			response: response,
		});

		ExecutionContextRegistry.SetExecutionContext(CONTEXT);

		const IS_PUBLIC_ASSET: boolean = await Server.HandlePublicAssets(CONTEXT);

		if (IS_PUBLIC_ASSET)
		{
			return;
		}

		const IS_ENDPOINT: boolean = await Server.HandleEndpoints(CONTEXT);

		if (IS_ENDPOINT)
		{
			return;
		}

		await response.replyWith({
			status: HTTPStatusCodeEnum.NOT_FOUND,
			payload: "404 - Not found.",
		});
	}

	private static async HandlePublicAssets(context: ExecutionContext): Promise<boolean>
	{
		if (context.getRequest().getMethod() !== HTTPMethodEnum.GET)
		{
			return false;
		}

		const FILE_PATH: string | undefined = await AssetRegistry.FindPublicAsset(context.getRequest().getPath());

		if (FILE_PATH === undefined)
		{
			return false;
		}

		LoggerProxy.Debug(`Public asset found "${FILE_PATH}".`);

		const FILE: Buffer = await FileSystemService.ReadBinaryFile(FILE_PATH);

		const CONTENT_TYPE: string = getContentType(extname(FILE_PATH));

		await context.getResponse().replyWith({
			payload: FILE,
			contentType: CONTENT_TYPE,
		});

		return true;
	}

	private static async HandleEndpoints(context: ExecutionContext): Promise<boolean>
	{
		const REQUEST: RichClientRequest = context.getRequest();
		const MATCHING_ENDPOINT: EndpointMatchInterface | undefined = EndpointRegistry.FindEndpoint(REQUEST.getMethod(), REQUEST.getPath());

		if (MATCHING_ENDPOINT === undefined)
		{
			return false;
		}

		const ENDPOINT: BaseEndpoint = MATCHING_ENDPOINT.endpoint;

		LoggerProxy.Debug(`Matching endpoint found: ${ENDPOINT.constructor.name}.`);

		ReflectUtility.Set(REQUEST, "pathMatchGroups", MATCHING_ENDPOINT.matchGroups);

		if (MATCHING_ENDPOINT.contextual)
		{
			ReflectUtility.Set(ENDPOINT, "context", context);
		}

		let has_error_occurred: boolean = true;

		try
		{
			await HookService.RunPreHooks(ENDPOINT, context);
			await ENDPOINT.execute(context);
			await HookService.RunPostHooks(ENDPOINT, context);

			has_error_occurred = false;
		}
		catch (error: unknown)
		{
			LoggerProxy.Error(error);

			await HookService.RunErrorHooks(ENDPOINT, context, error);
		}
		finally
		{
			await Server.FinalizeResponse(context, has_error_occurred);
		}

		return true;
	}

	private static async FinalizeResponse(context: ExecutionContext, has_error_occurred: boolean): Promise<void>
	{
		const RESPONSE: RichServerResponse = context.getResponse();

		if (!RESPONSE.isLocked())
		{
			RESPONSE.getHeaderNames().forEach(
				(header: string): void =>
				{
					RESPONSE.removeHeader(header);
				}
			);

			if (has_error_occurred)
			{
				LoggerProxy.Error("Unhandled server error.");

				await RESPONSE.replyWith({
					status: HTTPStatusCodeEnum.INTERNAL_SERVER_ERROR,
					payload: "500 - Internal Server Error.",
				});

				return;
			}

			LoggerProxy.Error("Unhandled response.");

			await RESPONSE.replyWith({
				status: HTTPStatusCodeEnum.NOT_FOUND,
				payload: "404 - Not found.",
			});

			return;
		}

		if (!RESPONSE.isProcessed())
		{
			LoggerProxy.Warning("Unfinished server response.");
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
