import type { Int32 } from "../../definition/type/integers.mjs";
import { assertInt32 } from "../type-assertion/assert-int32.mjs";

function int32(value: unknown): Int32
{
	assertInt32(value);

	return value;
}

export { int32 };
