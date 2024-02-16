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
					"should return an empty Map<string, string> when no cookies are present",
					(): void =>
					{
						const INPUT: string = "";
						const EXPECTED_OUTPUT: Map<string, string> = new Map();

						assert.deepStrictEqual(Cookie.Extract(INPUT), EXPECTED_OUTPUT);
					}
				);

				it(
					"should return a valid Map<string, string> when given a valid cookie header",
					(): void =>
					{
						const INPUT: string = "foo=bar; quz=qux";
						const EXPECTED_OUTPUT: Map<string, string> = new Map([
							["foo", "bar"],
							["quz", "qux"]
						]);

						assert.deepStrictEqual(Cookie.Extract(INPUT), EXPECTED_OUTPUT);
					}
				);

				it(
					"should return a valid Record<string, string> when the cookies defined in the header contain the equal (=) character",
					(): void =>
					{
						const INPUT: string = "foo=bar; quz=qux=zaz";
						const EXPECTED_OUTPUT: Map<string, string> = new Map([
							["foo", "bar"],
							["quz", "qux=zaz"]
						]);

						assert.deepStrictEqual(Cookie.Extract(INPUT), EXPECTED_OUTPUT);
					}
				);
			}
		);
	}
);
