import type { NonNullish } from "../extended/nullish/definition/type/non-nullish.mjs";
import { isDefined } from "../type-guard/is-defined.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertDefined<Type>(value: Type): asserts value is NonNullish<Type>
{
	if (!isDefined(value))
	{
		throw new ValidationError("The value must not be nullish (undefined, null, NaN, or NoValue).");
	}
}

export { assertDefined };
