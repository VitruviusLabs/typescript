import { deepStrictEqual, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { getInvertedValues } from "@vitruvius-labs/testing-ground";
import { buildCause } from "../../src/utils/build-cause.mjs";

describe(
	"TypeAssertion / utils / buildCause",
	(): void =>
	{
		it(
			"should return an ErrorOptions when given an Error",
			(): void =>
			{
				const ERROR: Error = new Error("lorem ipsum");

				const RESULT: unknown = buildCause(ERROR);

				deepStrictEqual(
					RESULT,
					{
						cause: ERROR,
					}
				);
			}
		);

		it(
			"should return undefined when given anything else",
			(): void =>
			{
				const ALL_VALUES: Array<unknown> = getInvertedValues();

				for (const ITEM of ALL_VALUES)
				{
					const RESULT: unknown = buildCause(ITEM);

					strictEqual(RESULT, undefined);
				}
			}
		);
	}
);
