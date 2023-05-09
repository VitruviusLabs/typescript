import { isArray } from "./isArray.js";

import type {
	ArrayConstraints,
	PopulatedArray,
} from "../Types/_index.js";

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
