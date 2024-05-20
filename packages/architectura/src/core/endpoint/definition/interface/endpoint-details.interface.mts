import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { BaseEndpoint } from "../../base.endpoint.mjs";

/** @internal */
interface EndpointDetailsInterface
{
	endpoint: BaseEndpoint | ConstructorOf<BaseEndpoint>;
	constructor: ConstructorOf<BaseEndpoint>;
	instance: BaseEndpoint;
}

export type { EndpointDetailsInterface };
