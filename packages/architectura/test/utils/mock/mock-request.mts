import type { Socket } from "node:net";
import { RichClientRequest } from "../../../src/_index.mjs";
import { mockSocket } from "./mock-socket.mjs";

function mockRequest(socket?: Socket): RichClientRequest
{
	const REQUEST: RichClientRequest = new RichClientRequest(socket ?? mockSocket());

	return REQUEST;
}

export { mockRequest };
