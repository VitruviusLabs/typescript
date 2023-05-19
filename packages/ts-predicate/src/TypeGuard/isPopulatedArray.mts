import { isArray } from "./isArray.mjs";

import type { ArrayConstraints, PopulatedArray } from "../types/_index.mjs";

function isPopulatedArray<Type>(
	value: unknown,
	constraints?: ArrayConstraints<Type>,
): value is PopulatedArray<Type>
{
	return isArray(value, {
		minLength: 1,
		...constraints,
	});
}

export { isPopulatedArray };
