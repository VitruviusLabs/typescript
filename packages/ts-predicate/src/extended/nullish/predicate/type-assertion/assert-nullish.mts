import type { NullishValues } from "../../definition/type/nullish-values.mjs";
import { ValidationError } from "../../../../type-assertion/utils/validation-error.mjs";
import { isNullish } from "../type-guard/is-nullish.mjs";

function assertNullish<Type>(value: Type): asserts value is Type & NullishValues
{
	if (!isNullish(value))
	{
		throw new ValidationError("The value must be nullish (null, undefined, NaN, or NoValue).");
	}
}

export { assertNullish };
