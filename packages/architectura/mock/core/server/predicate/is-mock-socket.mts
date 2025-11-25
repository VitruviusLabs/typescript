import type { MockSocketInterface } from "../definition/interface/mock-socket.interface.mjs";
import { Socket } from "node:net";
import { isInstanceOf, isStructuredData, unary } from "@vitruvius-labs/ts-predicate";

function isMockSocket(value: unknown): value is MockSocketInterface
{
	return isStructuredData<MockSocketInterface>(value, {
		instance: unary(isInstanceOf, Socket),
		stubs: { ignore: true },
		resetAllStubs: { ignore: true },
		restoreAllStubs: { ignore: true },
		callThroughAllStubs: { ignore: true },
	});
}

export { isMockSocket };
