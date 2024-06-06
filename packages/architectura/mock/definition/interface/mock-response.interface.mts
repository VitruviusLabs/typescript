import type { ServerResponse } from "node:http";
import type { BaseMockInterface } from "./base-mock.interface.mjs";
import type { MockSocketInterface } from "./mock-socket.interface.mjs";
import type { MockRequestInterface } from "./mock-request.interface.mjs";
import type { RichServerResponse } from "../../../src/_index.mjs";

interface MockResponseInterface extends BaseMockInterface<RichServerResponse, Exclude<keyof ServerResponse, "end" | "getHeader" | "write">>
{
	socket: MockSocketInterface;
	request: MockRequestInterface;
}

export type { MockResponseInterface };
