import { describe, it } from "node:test";
import { doesNotThrow, throws } from "node:assert";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { validateAlgorithm } from "../../../../src/service/jwt/utility/validate-algorithm.mjs";

describe(
	"validateAlgorithm",
	(): void =>
	{
		it(
			"should refuse to not use an algorithm",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateAlgorithm("none");
				};

				throws(WRAPPER, createErrorTest());
			}
		);

		it(
			"should reject unknown algorithms",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateAlgorithm("does-not-exists");
				};

				throws(WRAPPER, createErrorTest());
			}
		);

		it(
			"should accept known algorithms",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateAlgorithm("RSA-SHA256");
				};

				doesNotThrow(WRAPPER);
			}
		);
	}
);
