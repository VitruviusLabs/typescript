import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/_index.mjs";
import { getAllValues } from "@vitruvius-labs/testing-ground";

describe("TypeGuard.isInstanceOf", (): void => {
	it("should return true when given an instance of the given class", (): void => {
		strictEqual(TypeGuard.isInstanceOf(new Date(), Date), true);
	});

	it("should throw when given anything else", (): void => {
		const ALL_VALUES: Array<unknown> = getAllValues();

		for (const ITEM of ALL_VALUES)
		{
			strictEqual(TypeGuard.isInstanceOf(ITEM, Date), false);
		}
	});
});
