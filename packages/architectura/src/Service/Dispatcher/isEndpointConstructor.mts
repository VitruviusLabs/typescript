import { TypeGuard } from "@vitruvius-labs/ts-predicate";

import { BaseEndpoint } from "../../Endpoint/BaseEndpoint.mjs";

import type { ConstructorOf } from "../../utils/ConstructorOf.mjs";

function isEndpointConstructor(value: unknown): value is ConstructorOf<BaseEndpoint>
{
	return TypeGuard.isFunction(value) && value.prototype instanceof BaseEndpoint;
}

export { isEndpointConstructor };
