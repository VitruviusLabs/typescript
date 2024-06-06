import type { BaseEndpoint } from "../../base.endpoint.mjs";

/**
 * Interface for the result when an endpoint match a request
 *
 * @internal
 */
interface EndpointMatchInterface
{
	endpoint: BaseEndpoint;
	contextual: boolean;
	matchGroups: Record<string, string> | undefined;
}

export type { EndpointMatchInterface };
