import { Server as HTTPServer } from "node:http";

import { Server as HTTPSServer } from "node:https";


import { Dispatcher } from "../Service/Dispatcher.mjs";

import { FileSystem } from "../Service/FileSystem.mjs";

import { Logger } from "../Service/Logger.mjs";

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
	private static readonly PUBLIC_DIRECTORIES: Map<string, string> = new Map<string, string>();

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

			this.server = new HTTPSServer(
				{
					cert: options.certificate,
					key: options.key,
					IncomingMessage: ClientRequest,
					ServerResponse: VitruviusResponse
				},
				listener
			);

			return;
		}

		this.server = new HTTPServer(
			{
				IncomingMessage: ClientRequest,
				ServerResponse: VitruviusResponse
			},
			listener
		);
	}

	/**
	 * Create
	 */
	public static async Create(options: ServerConfigurationType): Promise<Server>
	{
		if (options.https) {
			const certificate: string = await FileSystem.ReadTextFile(options.certificate);
			const key: string = await FileSystem.ReadTextFile(options.key);
			const HTTPS_SERVER: Server = new Server(
				{
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

		for (const [route, directory] of this.PUBLIC_DIRECTORIES) {
			const ROUTE_REGEXP: RegExp = new RegExp(route);

			if (ROUTE_REGEXP.exec(request.getRequestedPath()) !== null) {
				const FILE_PATH: string = request.getRequestedPath().replace(ROUTE_REGEXP, "").padStart(1, "/");

				if (!(await FileSystem.FileExists(`${directory}${FILE_PATH}`))) {
					continue;
				}

				const FILE: Buffer = await FileSystem.ReadFileAsBuffer(`${directory}${FILE_PATH}`);

				CONTEXT.getResponse().send(FILE);

				return;
			}
		}

		Kernel.SetExecutionContext(CONTEXT);

		const ENDPOINTS: Map<string, typeof BaseEndpoint> = Dispatcher.GetEndpoints();

		for (const endpoint of ENDPOINTS) {
			if (new RegExp(endpoint[0]).test(request.getRequestedPath())) {

				for (const middleware of endpoint[1].GetMiddlewares()) {
					await middleware.Execute();
				}

				await endpoint[1].Execute();

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
	public static async AddPublicDirectory(directory: string, route: string): Promise<void>
	{
		if (!(await FileSystem.DirectoryExists(directory))) {
			throw new Error(`Impossible to add directory ${directory} as a public directory as it does not exist.`);
		}

		this.PUBLIC_DIRECTORIES.set(route, directory);
	}

	/**
	 * SetPublicDirectories
	 */
	public static async SetPublicDirectories(directories: Map<string, string>): Promise<void>
	{
		for (const directory of directories) {
			await this.AddPublicDirectory(directory[1], directory[0]);
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
			throw new Error(`"port" parameter isn't with range of valid ports. Must be an integer between ${PortsEnum.LOWEST_AVAILABLE.toString()} and ${PortsEnum.HIGHEST_AVAILABLE.toString()}`);
		}

		this.port = port;
	}
}

export { Server };
