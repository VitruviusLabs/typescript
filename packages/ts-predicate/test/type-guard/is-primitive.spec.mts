import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/index.mjs";
import { GroupType, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe(
	"TypeGuard.isPrimitive",
	(): void =>
	{
		it(
			"should return true when given a primitive value",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.PRIMITIVE);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isPrimitive(ITEM);

					strictEqual(RESULT, true);
				}
			}
		);

		it(
			"should return false when given a composite value",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.PRIMITIVE);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isPrimitive(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
