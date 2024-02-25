import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/index.mjs";
import { GroupType, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe(
	"TypeGuard.isInteger",
	(): void =>
	{
		it(
			"should return true when given a safe integer",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.INTEGER);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isInteger(ITEM);

					strictEqual(RESULT, true);
				}
			}
		);

		it(
			"should return false when given any other number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.REAL, GroupType.INFINITY);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isInteger(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isInteger(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
