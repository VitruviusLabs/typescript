import { isEnumValue } from "@vitruvius-labs/ts-predicate/type-guard";
import { HTTPMethodEnum } from "../_index.mjs";

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
