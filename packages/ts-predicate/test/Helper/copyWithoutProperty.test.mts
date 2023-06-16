import { deepStrictEqual } from "node:assert";

import { describe, it } from "node:test";

import { Helper } from "../../src/index.mjs";

describe(
	"Helper.copyWithoutProperty",
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

				const MISSING_FOO: Partial<Test> = Helper.copyWithoutProperty(VALID_OBJECT, "foo");
				const MISSING_BAR: Partial<Test> = Helper.copyWithoutProperty(VALID_OBJECT, "bar");

				deepStrictEqual(MISSING_FOO, { bar: "Hello, World!" });
				deepStrictEqual(MISSING_BAR, { foo: 42 });
			}
		);
	}
);
