import { isNullable } from "../type-guard/is-nullable.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertNullable(value: unknown): asserts value is null | undefined
{
	if (!isNullable(value))
	{
		throw new ValidationError("Value must be null or undefined.");
	}
}

export { assertNullable };
