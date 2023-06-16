import { deepStrictEqual } from "node:assert";

import { describe, it } from "node:test";

import { Helper } from "../../src/index.mjs";

import type { Invalid } from "../../src/index.mjs";

describe(
	"Helper.createCopiesWithInvalidProperty",
	(): void =>
	{
		it(
			"should return an array of objects, each with a different property set to the provided erroneous value.",
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

				const INVALID_OBJECTS: Array<Invalid<Test>> = Helper.createCopiesWithInvalidProperty<Test>(
					VALID_OBJECT,
					{
						foo: false,
						bar: false,
					}
				);

				deepStrictEqual(
					INVALID_OBJECTS,
					[
						{ foo: false, bar: "Hello, World!" },
						{ foo: 42, bar: false },
					]
				);
			}
		);
	}
);
