import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { isMockedModule } from "../../src/utils/is-mocked-module.mjs";

describe(
	"utils / isMockedModule",
	(): void =>
	{
		it(
			"should return when given an object",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isMockedModule({}, "test");
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isMockedModule(undefined, "test");
				};

				throws(WRAPPER, createErrorTest());
			}
		);
	}
);
