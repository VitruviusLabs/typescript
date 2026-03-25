import type { UInt16 } from "../../definition/type/integers.mjs";
import { assertUInt16 } from "../type-assertion/assert-uint16.mjs";

function uInt16(value: unknown): UInt16
{
	assertUInt16(value);

	return value;
}

export { uInt16 };
