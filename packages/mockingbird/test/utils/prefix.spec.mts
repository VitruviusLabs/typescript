import { doesNotThrow } from "node:assert";
import { describe, it } from "node:test";
import { prefix } from "../../src/utils/prefix.mjs";

describe(
	"prefix",
	(): void =>
	{
		it(
			"should be a valid file path url",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					new URL(`${prefix}dummy`);
				};

				doesNotThrow(WRAPPER);
			}
		);
	}
);
