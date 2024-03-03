import { isBigInt as guard } from "../type-guard/is-big-int.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function isBigInt(value: unknown): asserts value is bigint
{
	if (!guard(value))
	{
		throw new ValidationError("The value must be a big integer.");
	}
}

export { isBigInt };
