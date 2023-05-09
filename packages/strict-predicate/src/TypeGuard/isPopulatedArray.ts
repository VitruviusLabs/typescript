import { isArray } from "./isArray.js";

import type { ArrayConstraints, PopulatedArray } from "../Types/_index.js";

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
