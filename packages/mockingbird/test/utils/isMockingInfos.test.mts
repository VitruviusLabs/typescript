import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isMockingInfos } from "../../src/utils/isMockingInfos.mjs";

import { BaseType, getInvertedValues, testError } from "../common/utils.mjs";

describe(
	"utils / isMockingInfos",
	(): void =>
	{
		it(
			"should return when given a valid object",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isMockingInfos({
						token: "token",
						moduleIdentifier: "module",
						dependencyIdentifiers: ["dependency"]
					});
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const ALL_VALUES: Array<unknown> = getInvertedValues();

				for (const ITEM of ALL_VALUES)
				{
					const WRAPPER = (): void =>
					{
						isMockingInfos(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);

		it(
			"should throw if any item of dependencyIdentifiers is not a string",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isMockingInfos({
							token: "token",
							moduleIdentifier: "module",
							dependencyIdentifiers: [ITEM]
						});
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
