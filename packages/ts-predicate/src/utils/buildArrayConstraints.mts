import type { ArrayConstraints, Test } from "../index.mjs";

function buildArrayConstraints<Type>(constraints: ArrayConstraints<Type> | Test<Type> | undefined): ArrayConstraints<Type> | undefined
{
	if (typeof constraints === "function")
	{
		return {
			itemTest: constraints
		};
	}

	if (constraints !== undefined && constraints.minLength !== undefined && constraints.minLength < 1)
	{
		throw new RangeError("The minimum length cannot be less than one.");
	}

	return constraints;
}

export { buildArrayConstraints };
