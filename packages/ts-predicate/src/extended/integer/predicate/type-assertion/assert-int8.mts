import type { Int8 } from "../../definition/type/integers.mjs";
import { assertBetween } from "../../utils/assert-between.mjs";
import { IntegerBoundaryEnum } from "../../definition/enum/integer-boundary.enum.mjs";

function assertInt8(value: unknown): asserts value is Int8
{
	assertBetween(value, IntegerBoundaryEnum.INT8_MIN, IntegerBoundaryEnum.INT8_MAX);
}

export { assertInt8 };
