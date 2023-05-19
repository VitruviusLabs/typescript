import { deepStrictEqual, strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { buildError } from "../../../src/TypeAssertion/utils/buildError.mjs";

import { BaseType, getInvertedValues } from "../../common/getValues.mjs";

describe(
	"TypeAssertion / common/utils / buildError",
	(): void =>
	{
		it(
			"should return the given Error as is",
			(): void =>
			{
				const ERROR: Error = new Error("lorem ipsum");
				const RESULT: unknown = buildError(ERROR);

				strictEqual(RESULT, ERROR);
			}
		);

		it(
			"should return an Error that use the given string as message",
			(): void =>
			{
				const RESULT: unknown = buildError("lorem ipsum");

				deepStrictEqual(RESULT, new Error("lorem ipsum"));
			}
		);

		it(
			"should return a default Error when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = buildError(ITEM);

					deepStrictEqual(RESULT, new Error("An unknown error occurred."));
				}
			}
		);
	}
);
