import type { Int16 } from "../../definition/type/integers.mjs";
import { isBetween } from "../../utils/is-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function isInt16(value: unknown): value is Int16
{
	return isBetween(value, IntegerBoundaryEnum.INT16_MIN, IntegerBoundaryEnum.INT16_MAX);
}

export { isInt16 };
