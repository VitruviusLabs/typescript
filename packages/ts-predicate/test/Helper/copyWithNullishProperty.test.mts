import { deepStrictEqual } from "node:assert";

import { describe, it } from "node:test";

import { Helper } from "../../src/index.mjs";

import type { Nullable } from "../../src/index.mjs";

describe(
	"Helper.copyWithNullishProperty",
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

				const NULLISH_FOO: Nullable<Test> = Helper.copyWithNullishProperty(VALID_OBJECT, "foo");
				const NULLISH_BAR: Nullable<Test> = Helper.copyWithNullishProperty(VALID_OBJECT, "bar");

				deepStrictEqual(NULLISH_FOO, { foo: undefined, bar: "Hello, World!" });
				deepStrictEqual(NULLISH_BAR, { foo: 42, bar: undefined });
			}
		);
	}
);
