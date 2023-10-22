import { BaseEndpoint } from "../../Endpoint/BaseEndpoint.mjs";

function isBaseEndpoint(value: unknown): value is typeof BaseEndpoint
{
	return value instanceof Function && value.prototype instanceof BaseEndpoint && value !== BaseEndpoint;
}

export { isBaseEndpoint };
