import { AssertionError, strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { buildCause } from "../../../src/TypeAssertion/utils/buildCause.js";

import { hasNullableProperty } from "../../../src/TypeGuard/hasNullableProperty.js";

import { isRecord } from "../../../src/TypeGuard/isRecord.js";

import { getInvertedValues } from "../../utils.js";

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

				if (!isRecord(RESULT))
				{
					throw new AssertionError({
						message: "Expected value to be an object"
					});
				}

				if (!hasNullableProperty(RESULT, "cause"))
				{
					throw new AssertionError({
						message: 'Expected value to have a "cause" property'
					});
				}

				if (RESULT.cause === ERROR)
				{
					throw new AssertionError({
						message: 'Expected property "cause" to be the given error'
					});
				}
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
