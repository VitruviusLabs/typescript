import type { MockResponseInterface } from "../definition/interface/mock-response.interface.mjs";
import { isInstanceOf, isStructuredData, unary } from "@vitruvius-labs/ts-predicate";
import { isMockSocket } from "./is-mock-socket.mjs";
import { isMockRequest } from "./is-mock-request.mjs";
import { RichServerResponse } from "../../../../src/_index.mjs";

function isMockResponse(value: unknown): value is MockResponseInterface
{
	return isStructuredData<MockResponseInterface>(value, {
		instance: unary(isInstanceOf, RichServerResponse),
		socket: isMockSocket,
		request: isMockRequest,
		stubs: { ignore: true },
		resetAllStubs: { ignore: true },
		restoreAllStubs: { ignore: true },
		callThroughAllStubs: { ignore: true },
	});
}

export { isMockResponse };
