import { match, strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { resolveModuleIdentifier } from "../../src/utils/resolveModuleIdentifier.js";

describe(
	"utils / resolveModuleIdentifier",
	(): void =>
	{
		it(
			"should return node module identifiers as is",
			(): void =>
			{
				const RESULT: string = resolveModuleIdentifier("node:crypto", import.meta.url);

				strictEqual(RESULT, "node:crypto");
			}
		);

		it(
			"should return the absolute path of a file module",
			(): void =>
			{
				const RESULT: string = resolveModuleIdentifier("./foo.js", import.meta.url);

				match(RESULT, /file:\/\/.*\/foo\.js/);
			}
		);
	}
);
