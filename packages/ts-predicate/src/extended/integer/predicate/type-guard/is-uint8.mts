import type { UInt8 } from "../../definition/type/integers.mjs";
import { isBetween } from "../../utils/is-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function isUInt8(value: unknown): value is UInt8
{
	return isBetween(value, 0, IntegerBoundaryEnum.UINT8_MAX);
}

export { isUInt8 };
