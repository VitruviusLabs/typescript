import { isPrimitive as guard } from "../type-guard/is-primitive.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function isPrimitive(value: unknown): asserts value is bigint | boolean | number | string | null | undefined
{
	if (!guard(value))
	{
		throw new ValidationError("The value must be a primitive type.");
	}
}

export { isPrimitive };
