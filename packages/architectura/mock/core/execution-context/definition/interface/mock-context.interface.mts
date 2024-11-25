import type { BaseMockInterface } from "../../../../_index.mjs";
import type { MockRequestInterface, MockResponseInterface, MockSocketInterface } from "../../../server/_index.mjs";
import type { ExecutionContext } from "../../../../../src/_index.mjs";

interface MockContextInterface extends BaseMockInterface<ExecutionContext>
{
	socket: MockSocketInterface;
	request: MockRequestInterface;
	response: MockResponseInterface;
}

export type { MockContextInterface };
