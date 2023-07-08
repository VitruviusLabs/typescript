import { deepStrictEqual, strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { UnknownError } from "../../../src/TypeAssertion/utils/UnknownError.mjs";

import { buildError } from "../../../src/TypeAssertion/utils/buildError.mjs";

import { getInvertedValues } from "../../common/getValues.mjs";

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
			"should return an UnknownError when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues();

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = buildError(ITEM);

					deepStrictEqual(RESULT, new UnknownError("An unknown error occurred.", ITEM));
				}
			}
		);
	}
);
