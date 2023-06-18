import { deepStrictEqual } from "node:assert";

import { describe, it } from "node:test";

import { Helper } from "../../src/index.mjs";

describe(
	"Helper.createCopiesWithMissingProperty",
	(): void =>
	{
		it(
			"should return an array of objects, each missing a different property.",
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

				const INVALID_OBJECTS: Array<Partial<Test>> = Helper.createCopiesWithMissingProperty(VALID_OBJECT);

				deepStrictEqual(
					INVALID_OBJECTS,
					[
						{ bar: "Hello, World!" },
						{ foo: 42 },
					]
				);
			}
		);
	}
);
