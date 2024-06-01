import type { MockContextInterface } from "../definition/interface/mock-context.interface.mjs";
import { isInstanceOf, isStructuredData, unary } from "@vitruvius-labs/ts-predicate/type-guard";
import { isMockSocket } from "./is-mock-socket.mjs";
import { isMockRequest } from "./is-mock-request.mjs";
import { isMockResponse } from "./is-mock-response.mjs";
import { ExecutionContext } from "../../src/_index.mjs";

function isMockContext(value: unknown): value is MockContextInterface
{
	return isStructuredData<MockContextInterface>(value, {
		instance: unary(isInstanceOf, ExecutionContext),
		socket: isMockSocket,
		request: isMockRequest,
		response: isMockResponse,
		stubs: { ignore: true },
		resetAllStubs: { ignore: true },
		restoreAllStubs: { ignore: true },
		callThroughAllStubs: { ignore: true },
	});
}

export { isMockContext };
