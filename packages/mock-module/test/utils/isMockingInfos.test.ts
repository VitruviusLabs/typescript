import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isMockingInfos } from "../../src/utils/isMockingInfos.js";

import { getInvertedValues } from "../common/utils.js";

describe(
	"utils / isMockingInfos",
	(): void =>
	{
		it(
			"should return true when given a valid object",
			(): void =>
			{
				const RESULT: unknown = isMockingInfos({
					token: "token",
					moduleIdentifier: "module",
					dependencyIdentifiers: ["dependency"]
				});

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const ALL_VALUES: Array<unknown> = getInvertedValues();

				for (const ITEM of ALL_VALUES)
				{
					const RESULT: unknown = isMockingInfos(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
