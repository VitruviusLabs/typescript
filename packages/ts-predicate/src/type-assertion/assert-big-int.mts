import { isBigInt } from "../type-guard/is-big-int.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertBigInt(value: unknown): asserts value is bigint
{
	if (!isBigInt(value))
	{
		throw new ValidationError("The value must be a big integer.");
	}
}

export { assertBigInt };
