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
import { AccessControlDefinition } from "../endpoint/access-control-definition.mjs";
import { HTTPError } from "./http-error.mjs";

/**
 * Server class.
 *
 * @sealed
 */
class Server
{
	private static readonly NoError: unique symbol = Symbol("Server.NoError");

	private readonly port: number;
	private readonly https: boolean;
	private readonly defaultAccessControlDefinition: AccessControlDefinition | undefined;
	private readonly nativeServer: (
		| SecureServer<typeof RichClientRequest, typeof RichServerResponse>
		| UnsafeServer<typeof RichClientRequest, typeof RichServerResponse>
	);

	private constructor(options: ServerInstantiationType)
	{
		this.https = options.https;
		this.port = options.port;
		this.defaultAccessControlDefinition = options.defaultAccessControlDefinition;

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
					await SERVER.requestListener(request, response);
				}
				catch (error: unknown)
				{
					await SERVER.handleError(error);
				}
			}
		);

		return SERVER;
	}

	private static async ComputeServerOptions(options: ServerConfigurationType): Promise<ServerInstantiationType>
	{
		Server.ValidatePort(options.port);

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

	private static ValidatePort(port: number): void
	{
		assertInteger(port);

		if (port < PortsEnum.LOWEST_AVAILABLE || PortsEnum.HIGHEST_AVAILABLE < port)
		{
			throw new Error(`"port" parameter isn't within range of valid ports. It must be an integer between ${PortsEnum.LOWEST_AVAILABLE.toString()} and ${PortsEnum.HIGHEST_AVAILABLE.toString()}`);
		}
	}

	/**
	 * Start the server.
	 */
	public start(): void
	{
		this.nativeServer.listen(this.port);
		LoggerProxy.Informational("Server started.");
	}

	/**
	 * Return whether the server is secure or not
	 */
	public isHTTPS(): boolean
	{
		return this.https;
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
	public async handleError(error: unknown): Promise<void>
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

			await this.finalizeResponse(CONTEXT, error);
		}
		catch (scoped_error: unknown)
		{
			// eslint-disable-next-line no-console -- No alternative
			console.error(scoped_error);
		}
	}

	/** @internal */
	public async requestListener(request: RichClientRequest, response: RichServerResponse): Promise<void>
	{
		LoggerProxy.Debug(`Incoming request "${request.url ?? ""}".`);

		request.initialize();

		const CONTEXT: ExecutionContext = ExecutionContext.Create({
			request: request,
			response: response,
		});

		ExecutionContextRegistry.SetExecutionContext(CONTEXT);

		const IS_PUBLIC_ASSET: boolean = await this.handlePublicAssets(CONTEXT);

		if (IS_PUBLIC_ASSET)
		{
			return;
		}

		const IS_ENDPOINT: boolean = await this.handleEndpoints(CONTEXT);

		if (IS_ENDPOINT)
		{
			return;
		}

		await response.replyWith({
			status: HTTPStatusCodeEnum.NOT_FOUND,
			payload: "404 - Not found.",
		});
	}

	// eslint-disable-next-line @ts/class-methods-use-this -- this is not needed
	private async handlePublicAssets(context: ExecutionContext): Promise<boolean>
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

	private async handleAutomaticPreflight(context: ExecutionContext): Promise<void>
	{
		const REQUEST: RichClientRequest = context.getRequest();

		if (REQUEST.getMethod() !== HTTPMethodEnum.OPTIONS)
		{
			return;
		}

		const methods: Array<Exclude<HTTPMethodEnum, HTTPMethodEnum.OPTIONS>> = [
			HTTPMethodEnum.GET,
			HTTPMethodEnum.HEAD,
			HTTPMethodEnum.POST,
			HTTPMethodEnum.PUT,
			HTTPMethodEnum.DELETE,
			HTTPMethodEnum.CONNECT,
			HTTPMethodEnum.TRACE,
			HTTPMethodEnum.PATCH,
		];

		const ALLOWED_METHODS: Array<HTTPMethodEnum> = [];

		let access_control_definition: AccessControlDefinition | undefined = undefined;

		for (const method of methods)
		{
			const MATCHING_ENDPOINT: EndpointMatchInterface | undefined = EndpointRegistry.FindEndpoint(method, REQUEST.getPath());

			if (MATCHING_ENDPOINT === undefined)
			{
				continue;
			}

			ALLOWED_METHODS.push(method);

			const ENDPOINT_ACCESS_CONTROL_DEFINITION: AccessControlDefinition | undefined = MATCHING_ENDPOINT.endpoint.getAccessControlDefinition();

			if (ALLOWED_METHODS.length === 1)
			{
				access_control_definition = ENDPOINT_ACCESS_CONTROL_DEFINITION;

				continue;
			}

			if (access_control_definition !== ENDPOINT_ACCESS_CONTROL_DEFINITION)
			{
				throw new Error(`Multiple endpoints for path "${REQUEST.getPath()}" have different access control definitions.`);
			}
		}

		if (access_control_definition === undefined)
		{
			access_control_definition = this.defaultAccessControlDefinition;
		}

		if (access_control_definition === undefined)
		{
			access_control_definition = new AccessControlDefinition({
				allowedHeaders: [],
				allowedOrigins: [],
				maxAge: 0,
			});
		}

		const RESPONSE: RichServerResponse = context.getResponse();

		const headers: Headers = access_control_definition.generatePreflightHeaders();

		headers.append("Allow", ALLOWED_METHODS.join(", "));
		headers.append("Access-Control-Allow-Methods", ALLOWED_METHODS.join(", "));

		await RESPONSE.replyWith({
			status: HTTPStatusCodeEnum.NO_CONTENT,
			headers: headers,
		});
	}

	private async handleEndpoints(context: ExecutionContext): Promise<boolean>
	{
		const REQUEST: RichClientRequest = context.getRequest();
		const MATCHING_ENDPOINT: EndpointMatchInterface | undefined = EndpointRegistry.FindEndpoint(REQUEST.getMethod(), REQUEST.getPath());

		if (MATCHING_ENDPOINT === undefined)
		{
			if (REQUEST.getMethod() === HTTPMethodEnum.OPTIONS)
			{
				await this.handleAutomaticPreflight(context);

				return true;
			}

			return false;
		}

		const ENDPOINT: BaseEndpoint = MATCHING_ENDPOINT.endpoint;

		LoggerProxy.Debug(`Matching endpoint found: ${ENDPOINT.constructor.name}.`);

		ReflectUtility.Set(REQUEST, "pathMatchGroups", MATCHING_ENDPOINT.matchGroups);

		if (MATCHING_ENDPOINT.contextual)
		{
			ReflectUtility.Set(ENDPOINT, "context", context);
		}

		try
		{
			await HookService.RunPreHooks(ENDPOINT, context);
			await ENDPOINT.execute(context);
			await HookService.RunPostHooks(ENDPOINT, context);

			await this.finalizeResponse(context, Server.NoError);
		}
		catch (error: unknown)
		{
			try
			{
				await HookService.RunErrorHooks(ENDPOINT, context, error);
			}
			catch (scoped_error: unknown)
			{
				LoggerProxy.Error(scoped_error);
			}

			await this.finalizeResponse(context, error);
		}

		return true;
	}

	// eslint-disable-next-line @ts/class-methods-use-this -- this is not needed
	private async finalizeResponse(context: ExecutionContext, error: unknown): Promise<void>
	{
		const RESPONSE: RichServerResponse = context.getResponse();

		if (RESPONSE.isLocked())
		{
			if (!RESPONSE.isProcessed())
			{
				LoggerProxy.Warning("Unfinished server response.");
			}

			return;
		}

		if (error instanceof HTTPError)
		{
			await context.getResponse().replyWith({
				status: error.getStatusCode(),
				payload: {
					message: error.message,
					data: error.getData(),
				},
			});

			return;
		}

		if (error !== Server.NoError)
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
	}
}

export { Server };
