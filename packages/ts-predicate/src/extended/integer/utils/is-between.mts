import { isInteger } from "../../../type-guard/is-integer.mjs";

function isBetween(value: unknown, min: number, max: number): boolean
{
	return isInteger(value) && min <= value && value <= max;
}

export { isBetween };
