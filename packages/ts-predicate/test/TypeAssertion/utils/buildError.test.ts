import { AssertionError, strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { buildError } from "../../../src/TypeAssertion/utils/buildError.js";

import { BaseType, getInvertedValues } from "../../utils.js";

describe(
	"TypeAssertion / utils / buildError",
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

				if (!(RESULT instanceof Error))
				{
					throw new AssertionError({
						message: "Expect value to be an instance of Error"
					});
				}

				if (RESULT.message !== "lorem ipsum")
				{
					throw new AssertionError({
						message: "Expect value's message to be the given string"
					});
				}
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

					if (!(RESULT instanceof Error))
					{
						throw new AssertionError({
							message: "Expect value to be an instance of Error"
						});
					}

					if (RESULT.message !== 'An unknown error occured when validating property "test"')
					{
						throw new AssertionError({
							message: "Expect value's message to be the given string"
						});
					}
				}
			}
		);
	}
);
