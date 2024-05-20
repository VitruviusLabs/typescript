import type { BaseEndpoint } from "../../base.endpoint.mjs";

/** @internal */
interface EndpointMatchInterface
{
	endpoint: BaseEndpoint;
	matchGroups: Record<string, string> | undefined;
}

export type { EndpointMatchInterface };
