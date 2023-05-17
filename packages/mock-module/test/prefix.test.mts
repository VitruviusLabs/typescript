import { match, strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { fileURLToPath } from "node:url";

import { prefix } from "../src/prefix.mjs";

describe(
	"prefix",
	(): void =>
	{
		it(
			"should be a valid file path url",
			(): void =>
			{
				strictEqual(prefix, "file:///mock/");

				const RESULT: string = fileURLToPath(prefix);

				match(RESULT, /mock/);
			}
		);
	}
);
