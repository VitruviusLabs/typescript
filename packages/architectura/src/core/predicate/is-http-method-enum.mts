import { isEnumValue } from "@vitruvius-labs/ts-predicate/type-guard";
import { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";

/**
 * Check if the given value is a standard HTTP method.
 */
function isHTTPMethodEnum(value: unknown): value is HTTPMethodEnum
{
	return isEnumValue(value, [
		HTTPMethodEnum.GET,
		HTTPMethodEnum.HEAD,
		HTTPMethodEnum.POST,
		HTTPMethodEnum.PUT,
		HTTPMethodEnum.DELETE,
		HTTPMethodEnum.CONNECT,
		HTTPMethodEnum.OPTIONS,
		HTTPMethodEnum.TRACE,
		HTTPMethodEnum.PATCH,
	]);
}

export { isHTTPMethodEnum };
