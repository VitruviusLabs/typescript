import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/index.mjs";
import { GroupType, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe(
	"TypeGuard.isBoolean",
	(): void =>
	{
		it(
			"should return true when given a boolean",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isBoolean(ITEM);

					strictEqual(RESULT, true);
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isBoolean(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
