import type { BaseMockInterface } from "../../../_index.mjs";
import type { MockSocketInterface } from "./mock-socket.interface.mjs";
import type { MockRequestInterface } from "./mock-request.interface.mjs";
import type { MockResponseInterface } from "./mock-response.interface.mjs";
import type { ExecutionContext } from "../../../../src/_index.mjs";

interface MockContextInterface extends BaseMockInterface<ExecutionContext>
{
	socket: MockSocketInterface;
	request: MockRequestInterface;
	response: MockResponseInterface;
}

export type { MockContextInterface };
