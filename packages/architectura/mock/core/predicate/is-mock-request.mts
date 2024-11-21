import type { MockRequestInterface } from "../definition/interface/mock-request.interface.mjs";
import { isInstanceOf, isStructuredData, unary } from "@vitruvius-labs/ts-predicate/type-guard";
import { isMockSocket } from "./is-mock-socket.mjs";
import { RichClientRequest } from "../../../src/_index.mjs";

function isMockRequest(value: unknown): value is MockRequestInterface
{
	return isStructuredData<MockRequestInterface>(value, {
		instance: unary(isInstanceOf, RichClientRequest),
		socket: isMockSocket,
		stubs: { ignore: true },
		resetAllStubs: { ignore: true },
		restoreAllStubs: { ignore: true },
		callThroughAllStubs: { ignore: true },
	});
}

export { isMockRequest };
