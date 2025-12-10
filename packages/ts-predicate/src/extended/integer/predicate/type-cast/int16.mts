import type { Int16 } from "../../definition/type/integers.mjs";
import { assertInt16 } from "../type-assertion/assert-int16.mjs";

function int16(value: unknown): Int16
{
	assertInt16(value);

	return value;
}

export { int16 };
