import type { ArrayConstraints, PopulatedArray, Test } from "../definition/_index.mjs";
import { buildArrayConstraints } from "../utils/build-array-constraints.mjs";
import { isArray } from "./is-array.mjs";

function isPopulatedArray<Type>(
	value: unknown,
	constraints?: ArrayConstraints<Type> | Test<Type>
): asserts value is PopulatedArray<Type>
{
	const CONSTRAINTS: ArrayConstraints<Type> | undefined = buildArrayConstraints(constraints);

	isArray(value, {
		minLength: 1,
		...CONSTRAINTS,
	});
}

export { isPopulatedArray };
