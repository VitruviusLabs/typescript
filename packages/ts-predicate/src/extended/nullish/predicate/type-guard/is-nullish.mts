import type { NullishValues } from "../../definition/type/nullish-values.mjs";
import { isNonNullableNullish } from "../../../../utils/is-non-nullable-nullish.mjs";
import { isNullable } from "../../../../type-guard/is-nullable.mjs";

function isNullish<Type>(value: Type): value is Type & NullishValues
{
	return isNullable(value) || isNonNullableNullish(value);
}

export { isNullish };
