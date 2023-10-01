import { default as assert } from 'node:assert/strict';

import { describe, it } from 'node:test';

import { Cookie } from "../../src/Service/Cookie.mjs";

describe(
	"Cookie",
	(): void =>
	{
		describe(
			"Extract",
			(): void =>
			{
				it(
					"should return an empty Record<string, string> when no cookies are present",
					(): void =>
					{
						const INPUT: string = "";
						const EXPECTED_OUTPUT: Record<string, string> = {};

						assert.deepStrictEqual(Cookie.Extract(INPUT), EXPECTED_OUTPUT);
					}
				);

				it(
					"should return a valid Record<string, string> when given a valid cookie header",
					(): void =>
					{
						const INPUT: string = "foo=bar; quz=qux";
						const EXPECTED_OUTPUT: Record<string, string> = {
							foo: "bar",
							quz: "qux"
						};

						assert.deepStrictEqual(Cookie.Extract(INPUT), EXPECTED_OUTPUT);
					}
				);

				it(
					"should return a valid Record<string, string> when the cookies defined in the header contain the equal (=) character",
					(): void =>
					{
						const INPUT: string = "foo=bar; quz=qux=zaz";
						const EXPECTED_OUTPUT: Record<string, string> = {
							foo: "bar",
							quz: "qux=zaz"
						};

						assert.deepStrictEqual(Cookie.Extract(INPUT), EXPECTED_OUTPUT);
					}
				);

				it(
					"should return an empty Record<string, string> when the extraction regular expression does not have any named group",
					(): void =>
					{
						// @ts-expect-error - We need to modify this property for testing purposes.
						Cookie.EXTRACTION_REGEXP = / ?([^=]+)=([^;]+);?/g;

						const INPUT: string = "foo=bar; quz=qux";
						const EXPECTED_OUTPUT: Record<string, string> = {};

						assert.deepStrictEqual(Cookie.Extract(INPUT), EXPECTED_OUTPUT);

						// @ts-expect-error - It is critical to set this property back to it's expected state.
						Cookie.EXTRACTION_REGEXP = / ?(?<name>[^=]+)=(?<value>[^;]+);?/g;
					}
				);

				it(
					"should return an empty Record<string, string> when the regular expression as incorrectly named groups",
					(): void =>
					{
						// @ts-expect-error - We need to modify this property for testing purposes.
						Cookie.EXTRACTION_REGEXP = / ?(?<key>[^=]+)=(?<value>[^;]+);?/g;

						const INPUT: string = "foo=bar; quz=qux";
						const EXPECTED_OUTPUT: Record<string, string> = {};

						assert.deepStrictEqual(Cookie.Extract(INPUT), EXPECTED_OUTPUT);

						// @ts-expect-error - It is critical to set this property back to it's expected state.
						Cookie.EXTRACTION_REGEXP = / ?(?<name>[^=]+)=(?<value>[^;]+);?/g;
					}
				);
			}
		);
	}
);
