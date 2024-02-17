import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { TypeAssertion } from "../../src/index.mjs";

import { createErrorTest } from "../common/createErrorTest.mjs";

describe(
	"TypeAssertion.hasProperty",
	(): void =>
	{
		it(
			"should throw when given an object without the property",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.hasProperty({}, "answer");
				};

				throws(WRAPPER, createErrorTest(`The value must have a property "answer".`));
			}
		);

		it(
			"should throw when given an object with the property, but the value is nullish",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.hasProperty({ answer: undefined }, "answer");
				};

				throws(WRAPPER, createErrorTest(`The property "answer" must not have a nullish value (undefined, null, or NaN).`));
			}
		);

		it(
			"should return when given an object with the property and the value is not nullish",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.hasProperty({ answer: 42 }, "answer");
				};

				doesNotThrow(WRAPPER);
			}
		);
	}
);
