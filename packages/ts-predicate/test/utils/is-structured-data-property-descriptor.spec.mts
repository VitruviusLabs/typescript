import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { isStructuredDataPropertyDescriptor } from "../../src/utils/is-structured-data-property-descriptor.mjs";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeGuard / common/utils / isTypeAssertionStructuredDataDescriptor", (): void => {
	it("should return when given an object", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.RECORD);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				isStructuredDataPropertyDescriptor(ITEM, "test");
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.RECORD);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				isStructuredDataPropertyDescriptor(ITEM, "test");
			};

			throws(WRAPPER, createErrorTest('There is an invalid property descriptor for "test".'));
		}
	});
});
