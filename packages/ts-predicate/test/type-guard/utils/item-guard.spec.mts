import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { itemGuard } from "../../../src/type-guard/utils/item-guard.mjs";

describe("TypeAssertion / utils / itemGuard", (): void => {
	it("should return true when given a type guard and a valid value", (): void => {
		const GUARD = (value: unknown): value is number =>
		{
			return typeof value === "number";
		};

		const WRAPPER = (): void =>
		{
			itemGuard(42, GUARD);
		};

		doesNotThrow(WRAPPER);

		const RESULT: unknown = itemGuard(42, GUARD);

		strictEqual(RESULT, true);
	});

	it("should return false when given a type guard and an invalid value", (): void => {
		const GUARD = (value: unknown): value is number =>
		{
			return typeof value === "number";
		};

		const WRAPPER = (): void =>
		{
			itemGuard(null, GUARD);
		};

		doesNotThrow(WRAPPER);

		const RESULT: unknown = itemGuard(null, GUARD);

		strictEqual(RESULT, false);
	});

	it("should return true when given a type assertion and a valid value", (): void => {
		const GUARD = (value: unknown): asserts value is number =>
		{
			if (typeof value !== "number")
			{
				throw new Error("not a number");
			}
		};

		const WRAPPER = (): void =>
		{
			itemGuard(42, GUARD);
		};

		doesNotThrow(WRAPPER);

		const RESULT: unknown = itemGuard(42, GUARD);

		strictEqual(RESULT, true);
	});

	it("should return false when given a type assertion and an invalid value", (): void => {
		const GUARD = (value: unknown): asserts value is number =>
		{
			if (typeof value !== "number")
			{
				throw new Error("not a number");
			}
		};

		const WRAPPER = (): void =>
		{
			itemGuard(null, GUARD);
		};

		doesNotThrow(WRAPPER);

		const RESULT: unknown = itemGuard(null, GUARD);

		strictEqual(RESULT, false);
	});
});
