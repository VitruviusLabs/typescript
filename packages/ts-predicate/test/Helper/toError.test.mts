import { deepStrictEqual, strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { Helper } from "../../src/index.mjs";

import { getInvertedValues } from "../common/getValues.mjs";

describe(
	"Helper / toError",
	(): void =>
	{
		it(
			"should return the given Error as is",
			(): void =>
			{
				const ERROR: Error = new Error("lorem ipsum");
				const RESULT: unknown = Helper.toError(ERROR);

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
					const RESULT: unknown = Helper.toError(ITEM);

					deepStrictEqual(RESULT, new Helper.UnknownError("An unknown error occurred.", ITEM));
				}
			}
		);
	}
);
