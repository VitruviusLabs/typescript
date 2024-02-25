import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/index.mjs";
import { GroupType, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe(
	"TypeGuard.isBigInt",
	(): void =>
	{
		it(
			"should return true when given a big integer",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.BIG_INT);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isBigInt(ITEM);

					strictEqual(RESULT, true);
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.BIG_INT);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isBigInt(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
