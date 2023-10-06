import { Server as HTTPServer } from "node:http";

import { Server as HTTPSServer } from "node:https";


import { Dispatcher } from "../Service/Dispatcher.mjs";

import { FileSystem } from "../Service/FileSystem.mjs";

import { ClientRequest } from "./ClientRequest.mjs";

import { ExecutionContext } from "./ExecutionContext.mjs";

import { HTTPStatusCodeEnum } from "./HTTP/HTTPStatusCodeEnum.mjs";

import { Kernel } from "./Kernel.mjs";

import { PortsEnum } from "./Server/PortsEnum.mjs";


import { ServerResponse as VitruviusResponse } from "./ServerResponse.mjs";

import type { ServerConfigurationType } from "./Server/ServerConfigurationType.mjs";

import type { ServerInstantiationType } from "./Server/ServerInstantiationType.mjs";

import type { BaseEndpoint } from "../Endpoint/BaseEndpoint.mjs";

import type { RequestListener } from "http";

class Server
{
	private port: number = PortsEnum.DEFAULT_HTTPS;
	private readonly https: boolean = false;
	private readonly server: HTTPServer|HTTPSServer;

	/**
	 * constructor
	 */
	private constructor(options: ServerInstantiationType, listener: RequestListener)
	{
		this.https = options.https;
		this.port = options.port;

		if (options.https) {

			this.server = new HTTPSServer({
				cert: options.certificate,
				key: options.key,
				IncomingMessage: ClientRequest,
				ServerResponse: VitruviusResponse
			}, listener);

			return;
		}

		this.server = new HTTPServer(
			{
				IncomingMessage: ClientRequest,
				ServerResponse: VitruviusResponse
			},
			listener);
	}

	/**
	 * Create
	 */
	// public static async Create(configuration?: ServerConfigurationInterface|undefined): Promise<Server>
	public static async Create(options: ServerConfigurationType): Promise<Server>
	{
		if (options.https) {
			const certificate: string = await FileSystem.ReadTextFile(options.certificate);
			const key: string = await FileSystem.ReadTextFile(options.key);
			const HTTPS_SERVER: Server = new Server({
				...options,
				certificate: certificate,
				key: key
			},
			// @ts-expect-error - This is a very specific case where TypeScript cannot know that Node.JS will use our custom class instead of IncomingMessage.
			this.DefaultListener.bind(this)
			);

			return HTTPS_SERVER;
		}

		const HTTP_SERVER: Server = new Server(
			options,
			// @ts-expect-error - This is a very specific case where TypeScript cannot know that Node.JS will use our custom class instead of IncomingMessage.
			this.DefaultListener.bind(this)
		);

		return HTTP_SERVER;
	}

	public static async DefaultListener(request: ClientRequest, response: VitruviusResponse<ClientRequest>): Promise<void>
	{
		request.initialise();
		const requestBody: string = await request.listenForContent();

		request.setRawBody(requestBody);

		const CONTEXT: ExecutionContext = ExecutionContext.Create(
			{
				request: request,
				response: response
			}
		);

		Kernel.SetExecutionContext(CONTEXT);

		const ENDPOINTS: Map<string, typeof BaseEndpoint> = Dispatcher.GetEndpoints();

		for (const endpoint of ENDPOINTS) {
			console.debug(endpoint[0]);
			console.debug(request.getRequestedPath());
			console.debug(new RegExp(endpoint[0]).test(request.getRequestedPath()));

			if (new RegExp(endpoint[0]).test(request.getRequestedPath())) {
				await endpoint[1].Execute();

				return;
			}
		}

		response.statusCode = HTTPStatusCodeEnum.NOT_FOUND;
		response.write("Not found.");
		response.end();
	}

	/**
	 * start
	 */
	public start(): void
	{
		this.server.listen(this.port);
		// eslint-disable-next-line no-console -- @TODO: Change this to a logger.
		console.log("Server started.");
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
			throw new Error(`"port" parameter isn't with range of valid ports. Must be an integer between ${PortsEnum.LOWEST_AVAILABLE.toString()} and ${PortsEnum.HIGHEST_AVAILABLE.toString()}`);
		}

		this.port = port;
	}
}

export { Server };
