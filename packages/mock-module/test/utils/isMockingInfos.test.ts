import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isMockingInfos } from "../../src/Utils/isMockingInfos.js";

import { getInvertedValues } from "../common/utils.js";

describe(
	"utils / isMockingInfos",
	(): void =>
	{
		it(
			"should return true when given a valid object",
			(): void =>
			{
				doesNotThrow((): void =>
				{
					isMockingInfos({
						token: "token",
						moduleIdentifier: "module",
						dependencyIdentifiers: ["dependency"]
					});
				});
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const ALL_VALUES: Array<unknown> = getInvertedValues();

				for (const ITEM of ALL_VALUES)
				{
					throws((): void =>
					{
						isMockingInfos(ITEM);
					});
				}
			}
		);
	}
);
