import { fail } from "node:assert/strict";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";

function fluent_least(assertion: FluentAssertionInternal, min: bigint | number): void
{
	assertion.disableNegation("least", "below");

	assertion.appendAction(
		(): void =>
		{
			if (typeof assertion.actualValue !== "number" && typeof assertion.actualValue !== "bigint")
			{
				fail(`Expected ${assertion.name} to be a number or a bigint`);
			}

			if (assertion.actualValue < min)
			{
				fail(`Expected ${assertion.name} to be at least ${min.toString()}`);
			}
		}
	);
}

export { fluent_least };
