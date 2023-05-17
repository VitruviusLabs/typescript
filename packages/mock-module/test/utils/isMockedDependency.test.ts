import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isMockedDependency } from "../../src/Utils/isMockedDependency.js";

import { testError } from "../common/utils.js";

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

				throws(WRAPPER, testError);
			}
		);
	}
);
