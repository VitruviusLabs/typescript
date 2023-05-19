import { isArray } from "./isArray.mjs";

import type { ArrayConstraints, PopulatedArray } from "../types/_index.mjs";

function isPopulatedArray<Type>(
	value: unknown,
	constraints?: ArrayConstraints<Type>,
): asserts value is PopulatedArray<Type>
{
	isArray(value, {
		minLength: 1,
		...constraints,
	});
}

export { isPopulatedArray };
