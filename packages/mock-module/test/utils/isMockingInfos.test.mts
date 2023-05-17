import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isMockingInfos } from "../../src/utils/isMockingInfos.mjs";

import { getInvertedValues, testError } from "../common/utils.mjs";

describe(
	"utils / isMockingInfos",
	(): void =>
	{
		it(
			"should return true when given a valid object",
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
			"should return false when given anything else",
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
	}
);
