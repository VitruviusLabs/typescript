import { throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { createErrorTest, getAllValues } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.isInstanceOf", (): void => {
	it("should return when given an instance of the given class", (): void => {
		TypeAssertion.isInstanceOf(new Date(), Date);
	});

	it("should throw when given anything else", (): void => {
		const ALL_VALUES: Array<unknown> = getAllValues();

		for (const ITEM of ALL_VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.isInstanceOf(ITEM, Date);
			};

			throws(WRAPPER, createErrorTest());
		}
	});
});
