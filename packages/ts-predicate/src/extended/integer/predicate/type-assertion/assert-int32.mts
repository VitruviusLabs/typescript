import type { Int32 } from "../../definition/type/integers.mjs";
import { assertBetween } from "../../utils/assert-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function assertInt32(value: unknown): asserts value is Int32
{
	assertBetween(value, IntegerBoundaryEnum.INT32_MIN, IntegerBoundaryEnum.INT32_MAX);
}

export { assertInt32 };
