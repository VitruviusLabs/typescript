import type {
	Int16Tag,
	Int32Tag,
	Int8Tag,
	UInt16Tag,
	UInt32Tag,
	UInt8Tag,
} from "../../utils/tags.mjs";

type UInt32 = number & { [UInt32Tag]: typeof UInt32Tag };

type UInt16 = UInt32 & { [UInt16Tag]: typeof UInt16Tag };

type UInt8 = UInt16 & { [UInt8Tag]: typeof UInt8Tag };

type Int32 = number & { [Int32Tag]: typeof Int32Tag };

type Int16 = Int32 & { [Int16Tag]: typeof Int16Tag };

type Int8 = Int16 & { [Int8Tag]: typeof Int8Tag };

export type {
	UInt32,
	UInt16,
	UInt8,
	Int32,
	Int16,
	Int8,
};
