import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isMockedModule } from "../../src/utils/isMockedModule.js";

import { testError } from "../common/utils.js";

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

				throws(WRAPPER, testError);
			}
		);
	}
);
