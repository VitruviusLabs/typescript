import type { UInt32 } from "../../definition/type/integers.mjs";
import { assertUInt32 } from "../type-assertion/assert-uint32.mjs";

function uInt32(value: unknown): UInt32
{
	assertUInt32(value);

	return value;
}

export { uInt32 };
