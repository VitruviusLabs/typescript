import { deepStrictEqual } from "node:assert";

import { describe, it } from "node:test";

import { Helper } from "../../src/index.mjs";

import type { Invalid } from "../../src/index.mjs";

describe(
	"Helper.copyWithInvalidProperty",
	(): void =>
	{
		it(
			"should generate an object with all the properties but the asked property.",
			(): void =>
			{
				interface Test
				{
					foo: number;
					bar: string;
				}

				const VALID_OBJECT: Test = {
					foo: 42,
					bar: "Hello, World!",
				};

				const INVALID_VALUE: boolean = true;

				const INVALID_FOO: Invalid<Test> = Helper.copyWithInvalidProperty(VALID_OBJECT, "foo", INVALID_VALUE);
				const INVALID_BAR: Invalid<Test> = Helper.copyWithInvalidProperty(VALID_OBJECT, "bar", INVALID_VALUE);

				deepStrictEqual(INVALID_FOO, { foo: INVALID_VALUE, bar: "Hello, World!" });
				deepStrictEqual(INVALID_BAR, { foo: 42, bar: INVALID_VALUE });
			}
		);

		it(
			"should be able to manually make an entirely invalid object.",
			(): void =>
			{
				interface Test
				{
					foo: number;
					bar: string;
				}

				const INVALID_OBJECT: Invalid<Test> = {
					foo: false,
					bar: true,
				};

				deepStrictEqual(INVALID_OBJECT, { foo: false, bar: true });
			}
		);
	}
);
