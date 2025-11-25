import type { Int8 } from "../../definition/type/integers.mjs";
import { isBetween } from "../../utils/is-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function isInt8(value: unknown): value is Int8
{
	return isBetween(value, IntegerBoundaryEnum.INT8_MIN, IntegerBoundaryEnum.INT8_MAX);
}

export { isInt8 };
