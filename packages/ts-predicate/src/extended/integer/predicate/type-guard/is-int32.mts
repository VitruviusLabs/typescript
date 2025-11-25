import type { Int32 } from "../../definition/type/integers.mjs";
import { isBetween } from "../../utils/is-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function isInt32(value: unknown): value is Int32
{
	return isBetween(value, IntegerBoundaryEnum.INT32_MIN, IntegerBoundaryEnum.INT32_MAX);
}

export { isInt32 };
