import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, createErrorTest, getAllValues, getInvertedValues } from "@vitruvius-labs/testing-ground";
import { isMockingInfos } from "../../src/utils/is-mocking-infos.mjs";

describe("utils / isMockingInfos", (): void => {
	it("should return when given a valid object", (): void => {
		const WRAPPER = (): void =>
		{
			isMockingInfos({
				token: "token",
				moduleIdentifier: "module",
				dependencyIdentifiers: ["dependency"],
			});
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when given anything else", (): void => {
		const ALL_VALUES: Array<unknown> = getAllValues();

		for (const ITEM of ALL_VALUES)
		{
			const WRAPPER = (): void =>
			{
				isMockingInfos(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should throw if any item of dependencyIdentifiers is not a string", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				isMockingInfos({
					token: "token",
					moduleIdentifier: "module",
					dependencyIdentifiers: [ITEM],
				});
			};

			throws(WRAPPER, createErrorTest());
		}
	});
});
