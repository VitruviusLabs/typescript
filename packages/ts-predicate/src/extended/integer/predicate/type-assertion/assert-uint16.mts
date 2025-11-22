import type { UInt16 } from "../../definition/type/integers.mjs";
import { assertBetween } from "../../utils/assert-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function assertUInt16(value: unknown): asserts value is UInt16
{
	assertBetween(value, 0, IntegerBoundaryEnum.UINT16_MAX);
}

export { assertUInt16 };
