import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { HTTPMethodEnum } from "../../../definition/enum/http-method.enum.mjs";
import type { BaseEndpoint } from "../../base.endpoint.mjs";

/**
 * Interface for storing an endpoint in the registry
 *
 * @internal
 */
interface EndpointEntryInterface
{
	method: HTTPMethodEnum;
	route: RegExp;
	endpoint: BaseEndpoint | ConstructorOf<BaseEndpoint>;
}

export type { EndpointEntryInterface };
