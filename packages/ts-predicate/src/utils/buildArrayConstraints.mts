import type { ArrayConstraints, Test } from "../index.mjs";

function buildArrayConstraints<Type>(constraints: ArrayConstraints<Type> | Test<Type> | undefined): ArrayConstraints<Type> | undefined
{
	if (typeof constraints === "function")
	{
		return {
			itemTest: constraints
		};
	}

	return constraints;
}

export { buildArrayConstraints };
