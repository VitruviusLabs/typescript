import type { UInt32 } from "../../definition/type/integers.mjs";
import { assertBetween } from "../../utils/assert-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function assertUInt32(value: unknown): asserts value is UInt32
{
	assertBetween(value, 0, IntegerBoundaryEnum.UINT32_MAX);
}

export { assertUInt32 };
