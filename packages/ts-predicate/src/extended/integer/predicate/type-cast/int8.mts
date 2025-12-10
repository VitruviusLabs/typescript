import type { Int8 } from "../../definition/type/integers.mjs";
import { assertInt8 } from "../type-assertion/assert-int8.mjs";

function int8(value: unknown): Int8
{
	assertInt8(value);

	return value;
}

export { int8 };
