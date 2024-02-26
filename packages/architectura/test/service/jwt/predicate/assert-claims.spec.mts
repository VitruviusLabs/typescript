import { describe, it } from "node:test";
import { doesNotThrow, throws } from "node:assert";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { assertClaims } from "../../../../src/service/jwt/predicate/assert-claims.mjs";

describe("assertClaims", (): void => {
	it("should return when given a record", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.RECORD);

		for (const VALUE of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertClaims(VALUE);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.RECORD);

		for (const VALUE of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertClaims(VALUE);
			};

			throws(WRAPPER, createErrorTest());
		}
	});
});
