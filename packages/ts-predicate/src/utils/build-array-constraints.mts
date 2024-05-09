import type { ArrayConstraints } from "../definition/interface/array-constraints.mjs";
import type { Test } from "../definition/type/test.mjs";

/** @internal */
function buildArrayConstraints<Type>(constraints: ArrayConstraints<Type> | Test<Type> | undefined): ArrayConstraints<Type> | undefined
{
	if (typeof constraints === "function")
	{
		return {
			itemTest: constraints,
		};
	}

	if (constraints?.minLength !== undefined && constraints.minLength < 1)
	{
		throw new RangeError("The minimum length cannot be less than one.");
	}

	return constraints;
}

export { buildArrayConstraints };
