import { buildArrayConstraints } from "../utils/build-array-constraints.mjs";
import { isArray } from "./is-array.mjs";
import type { ArrayConstraints, PopulatedArray, Test } from "../definition/_index.mjs";

function isPopulatedArray<Type>(
	value: unknown,
	constraints?: ArrayConstraints<Type> | Test<Type>
): value is PopulatedArray<Type>
{
	const CONSTRAINTS: ArrayConstraints<Type> | undefined = buildArrayConstraints(constraints);

	return isArray(value, {
		minLength: 1,
		...CONSTRAINTS,
	});
}

export { isPopulatedArray };
