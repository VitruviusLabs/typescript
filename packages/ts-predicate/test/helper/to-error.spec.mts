import { deepStrictEqual, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { UnknownError, toError } from "../../src/_index.mjs";
import { getAllValues } from "@vitruvius-labs/testing-ground";

describe("toError", (): void => {
	it("should return the given Error as is", (): void => {
		const ERROR: Error = new Error("lorem ipsum");
		const RESULT: unknown = toError(ERROR);

		strictEqual(RESULT, ERROR);
	});

	it("should return an UnknownError when given anything else", (): void => {
		const VALUES: Array<unknown> = getAllValues();

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = toError(ITEM);

			deepStrictEqual(RESULT, new UnknownError("An unknown error occurred.", ITEM));
		}
	});
});
