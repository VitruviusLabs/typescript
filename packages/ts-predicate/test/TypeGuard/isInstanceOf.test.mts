import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { TypeGuard } from "../../src/index.mjs";

import { getInvertedValues } from "../common/getValues.mjs";

describe(
	"TypeGuard.isInstanceOf",
	(): void =>
	{
		it(
			"should return true when given an instance of the given class",
			(): void =>
			{
                strictEqual(TypeGuard.isInstanceOf(new Date(), Date), true);
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const ALL_VALUES: Array<unknown> = getInvertedValues();

				for (const ITEM of ALL_VALUES)
				{
					strictEqual(TypeGuard.isInstanceOf(ITEM, Date), false);
				}
			}
		);
	}
);
