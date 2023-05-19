import { doesNotThrow, strictEqual, throws } from "node:assert";

import { describe, it } from "node:test";

import { itemAssertion } from "../../../src/TypeAssertion/utils/itemAssertion.mjs";

import { testError } from "../../common/testError.mjs";

describe(
	"TypeAssertion / utils / itemAssertion",
	(): void =>
	{
		it(
			"should return when given a type guard and a valid value",
			(): void =>
			{
				const GUARD = (value: unknown): value is number =>
				{
					return typeof value === "number";
				};

				const WRAPPER = (): void =>
				{
					itemAssertion(42, GUARD);
				};

				doesNotThrow(WRAPPER);

				// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- Test
				const RESULT: unknown = itemAssertion(42, GUARD);

				strictEqual(RESULT, undefined);
			}
		);

		it(
			"should throw when given a type guard and an invalid value",
			(): void =>
			{
				const GUARD = (value: unknown): value is number =>
				{
					return typeof value === "number";
				};

				const WRAPPER = (): void =>
				{
					itemAssertion(null, GUARD);
				};

				throws(WRAPPER, testError);
			}
		);

		it(
			"should return when given a type assertion and a valid value",
			(): void =>
			{
				const GUARD = (value: unknown): asserts value is number =>
				{
					if (typeof value !== "number")
					{
						throw new Error("not a number");
					}
				};

				const WRAPPER = (): void =>
				{
					itemAssertion(42, GUARD);
				};

				doesNotThrow(WRAPPER);

				// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- Test
				const RESULT: unknown = itemAssertion(42, GUARD);

				strictEqual(RESULT, undefined);
			}
		);

		it(
			"should throw when given a type assertion and an invalid value",
			(): void =>
			{
				const GUARD = (value: unknown): asserts value is number =>
				{
					if (typeof value !== "number")
					{
						throw new Error("not a number");
					}
				};

				const WRAPPER = (): void =>
				{
					itemAssertion(null, GUARD);
				};

				throws(WRAPPER, testError);
			}
		);
	}
);
