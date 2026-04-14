import { fail } from "node:assert/strict";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";

function fluent_below(assertion: FluentAssertionInternal, max: bigint | number): void
{
	assertion.disableNegation("below", "least");

	assertion.appendAction(
		(): void =>
		{
			if (typeof assertion.actualValue !== "number" && typeof assertion.actualValue !== "bigint")
			{
				fail(`Expected ${assertion.name} to be a number or a bigint`);
			}

			if (assertion.actualValue >= max)
			{
				fail(`Expected ${assertion.name} to be below ${max.toString()}`);
			}
		}
	);
}

export { fluent_below };
