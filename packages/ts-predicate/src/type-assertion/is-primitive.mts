import { isPrimitive as guard } from "../type-guard/is-primitive.mjs";

function isPrimitive(value: unknown): asserts value is bigint | boolean | number | string | null | undefined
{
	if (!guard(value))
	{
		throw new Error("The value must be a primitive type.");
	}
}

export { isPrimitive };
