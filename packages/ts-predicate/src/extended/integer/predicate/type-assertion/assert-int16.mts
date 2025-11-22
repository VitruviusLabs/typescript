import type { Int16 } from "../../definition/type/integers.mjs";
import { assertBetween } from "../../utils/assert-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function assertInt16(value: unknown): asserts value is Int16
{
	assertBetween(value, IntegerBoundaryEnum.INT16_MIN, IntegerBoundaryEnum.INT16_MAX);
}

export { assertInt16 };
