import { doesNotThrow } from "node:assert";
import { describe, it } from "node:test";
import { consumeValue, createValue } from "@vitruvius-labs/testing-ground";
import type { Int16, Int32, Int8, UInt16, UInt32, UInt8 } from "../../../src/_index.mjs";

describe("Integers", (): void => {
	it("should be compatible with a broader one", (): void => {
		const WRAPPER = (): void =>
		{
			consumeValue<Int16>(createValue<Int8>());
			consumeValue<Int32>(createValue<Int16>());
			consumeValue<number>(createValue<Int32>());

			consumeValue<UInt16>(createValue<UInt8>());
			consumeValue<UInt32>(createValue<UInt16>());
			consumeValue<number>(createValue<UInt32>());
		};

		doesNotThrow(WRAPPER);
	});

	it("should be incompatible with a narrower one", (): void => {
		const WRAPPER = (): void =>
		{
			// @ts-expect-error: Type should be incompatible
			consumeValue<Int8>(createValue<Int16>());
			// @ts-expect-error: Type should be incompatible
			consumeValue<Int16>(createValue<Int32>());
			// @ts-expect-error: Type should be incompatible
			consumeValue<Int32>(createValue<number>());

			// @ts-expect-error: Type should be incompatible
			consumeValue<UInt8>(createValue<UInt16>());
			// @ts-expect-error: Type should be incompatible
			consumeValue<UInt16>(createValue<UInt32>());
			// @ts-expect-error: Type should be incompatible
			consumeValue<UInt32>(createValue<number>());
		};

		doesNotThrow(WRAPPER);
	});
});
