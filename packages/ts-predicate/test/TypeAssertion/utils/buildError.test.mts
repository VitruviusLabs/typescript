import { deepStrictEqual, strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { buildError } from "../../../src/TypeAssertion/utils/buildError.mjs";

import { BaseType, getInvertedValues } from "../../common/utils.mjs";

describe(
	"TypeAssertion / common/utils / buildError",
	(): void =>
	{
		it(
			"should return an instance of Error as is",
			(): void =>
			{
				const ERROR: Error = new Error("lorem ipsum");
				const RESULT: unknown = buildError(ERROR, "test");

				strictEqual(RESULT, ERROR);
			}
		);

		it(
			"should convert a string into an instance of Error that has that string as message",
			(): void =>
			{
				const RESULT: unknown = buildError("lorem ipsum", "test");

				deepStrictEqual(RESULT, new Error("lorem ipsum"));
			}
		);

		it(
			"should generate a default error when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = buildError(ITEM, "test");

					deepStrictEqual(RESULT, new Error('An unknown error occurred when validating property "test"'));
				}
			}
		);
	}
);
