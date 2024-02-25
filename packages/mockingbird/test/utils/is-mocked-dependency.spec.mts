import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { isMockedDependency } from "../../src/utils/is-mocked-dependency.mjs";

describe(
	"utils / isMockedDependency",
	(): void =>
	{
		it(
			"should return when given an object",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isMockedDependency({}, "test");
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
					isMockedDependency(undefined, "test");
				};

				throws(WRAPPER, createErrorTest());
			}
		);
	}
);
