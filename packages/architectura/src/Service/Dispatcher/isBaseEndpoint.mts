import { BaseEndpoint } from "../../Endpoint/BaseEndpoint.mjs";

function isBaseEndpoint(value: unknown): value is BaseEndpoint
{
	return value instanceof BaseEndpoint;
}

export { isBaseEndpoint };
