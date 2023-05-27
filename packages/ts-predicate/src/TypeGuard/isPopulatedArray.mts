import { buildArrayConstraints } from "../utils/buildArrayConstraints.mjs";

import { isArray } from "./isArray.mjs";

import type { ArrayConstraints, PopulatedArray, Test } from "../types/_index.mjs";

function isPopulatedArray<Type>(
	value: unknown,
	constraints?: ArrayConstraints<Type> | Test<Type>,
): value is PopulatedArray<Type>
{
	const CONSTRAINTS: ArrayConstraints<Type> | undefined = buildArrayConstraints(constraints);

	return isArray(value, {
		minLength: 1,
		...CONSTRAINTS,
	});
}

export { isPopulatedArray };
