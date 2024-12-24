import type { ArrayConstraints, PopulatedArray, Test } from "../definition/_index.mjs";
import { buildArrayConstraints } from "../utils/build-array-constraints.mjs";
import { assertArray } from "./assert-array.mjs";

function assertPopulatedArray<Type>(value: Array<Type> | null | undefined): asserts value is PopulatedArray<Type>;
function assertPopulatedArray<Type>(value: unknown, constraints?: ArrayConstraints<Type> | Test<Type>): asserts value is PopulatedArray<Type>;

function assertPopulatedArray<Type>(value: unknown, constraints?: ArrayConstraints<Type> | Test<Type>): asserts value is PopulatedArray<Type>
{
	const CONSTRAINTS: ArrayConstraints<Type> | undefined = buildArrayConstraints(constraints);

	assertArray(value, {
		minLength: 1,
		...CONSTRAINTS,
	});
}

export { assertPopulatedArray };
