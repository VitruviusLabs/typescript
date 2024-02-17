import { deepStrictEqual } from "node:assert";

import { describe, it } from "node:test";

import { Helper, type Nullable } from "../../src/index.mjs";

describe(
	"Helper.createCopiesWithNullishProperty",
	(): void =>
	{
		it(
			"should generate an array of objects, each with a different property set to undefined.",
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

				const INVALID_OBJECTS: Array<Nullable<Test>> = Helper.createCopiesWithNullishProperty(VALID_OBJECT);

				deepStrictEqual(
					INVALID_OBJECTS,
					[
						{ foo: undefined, bar: "Hello, World!" },
						{ foo: 42, bar: undefined },
					]
				);
			}
		);
	}
);
