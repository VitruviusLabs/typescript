import { isPrimitive } from "../type-guard/is-primitive.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertPrimitive(value: unknown): asserts value is bigint | boolean | number | string | null | undefined
{
	if (!isPrimitive(value))
	{
		throw new ValidationError("The value must be a primitive type.");
	}
}

export { assertPrimitive };
