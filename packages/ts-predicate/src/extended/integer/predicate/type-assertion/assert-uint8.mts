import type { UInt8 } from "../../definition/type/integers.mjs";
import { assertBetween } from "../../utils/assert-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function assertUInt8(value: unknown): asserts value is UInt8
{
	assertBetween(value, 0, IntegerBoundaryEnum.UINT8_MAX);
}

export { assertUInt8 };
