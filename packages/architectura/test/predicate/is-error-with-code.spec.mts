import { describe, it } from "node:test";
import { isErrorWithCode } from "../../src/_index.mjs";
import { getAllValues } from "@vitruvius-labs/testing-ground";
import { strictEqual } from "node:assert";

describe("isErrorWithCode", (): void => {
	it("should return false if the value is not an instanceof Error", (): void => {
		const ALL_VALUES: Array<unknown> = getAllValues();

		for (const VALUE of ALL_VALUES)
		{
			strictEqual(isErrorWithCode(VALUE), false);
		}
	});

	it("should return false if the error has no code property", (): void => {
		strictEqual(isErrorWithCode(new Error("dummy error")), false);
	});

	it("should return false if the error has a code property that is not a string", (): void => {
		const ERROR: unknown = new Error("dummy error");

		// @ts-expect-error: For testing purposes
		Reflect.set(ERROR, "code", 1);

		strictEqual(isErrorWithCode(ERROR), false);
	});

	it("should return true if the error has a code property that is a string", (): void => {
		const ERROR: unknown = new Error("dummy error");

		// @ts-expect-error: For testing purposes
		Reflect.set(ERROR, "code", "Lorem ipsum");

		strictEqual(isErrorWithCode(ERROR), true);
	});
});
