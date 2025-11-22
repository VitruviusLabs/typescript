import type { UInt16 } from "../../definition/type/integers.mjs";
import { isBetween } from "../../utils/is-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function isUInt16(value: unknown): value is UInt16
{
	return isBetween(value, 0, IntegerBoundaryEnum.UINT16_MAX);
}

export { isUInt16 };
