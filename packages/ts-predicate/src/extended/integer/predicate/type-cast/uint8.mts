import type { UInt8 } from "../../definition/type/integers.mjs";
import { assertUInt8 } from "../type-assertion/assert-uint8.mjs";

function uInt8(value: unknown): UInt8
{
	assertUInt8(value);

	return value;
}

export { uInt8 };
