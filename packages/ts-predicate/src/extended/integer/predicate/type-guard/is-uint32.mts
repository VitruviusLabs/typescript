import type { UInt32 } from "../../definition/type/integers.mjs";
import { isBetween } from "../../utils/is-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function isUInt32(value: unknown): value is UInt32
{
	return isBetween(value, 0, IntegerBoundaryEnum.UINT32_MAX);
}

export { isUInt32 };
