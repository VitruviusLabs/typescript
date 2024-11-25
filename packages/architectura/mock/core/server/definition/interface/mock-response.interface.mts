import type { ServerResponse } from "node:http";
import type { BaseMockInterface } from "../../../../_index.mjs";
import type { MockSocketInterface } from "./mock-socket.interface.mjs";
import type { MockRequestInterface } from "./mock-request.interface.mjs";
import type { RichServerResponse } from "../../../../../src/_index.mjs";

interface MockResponseInterface extends BaseMockInterface<RichServerResponse, Exclude<keyof ServerResponse, "end" | "getHeader" | "getHeaderNames" | "removeHeader" | "write">>
{
	socket: MockSocketInterface;
	request: MockRequestInterface;
}

export type { MockResponseInterface };
