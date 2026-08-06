import { fail } from "node:assert/strict";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";

function fluent_most(assertion: FluentAssertionInternal, max: bigint | number): void
{
	assertion.disableNegation("most", "above");

	assertion.appendAction(
		(): void =>
		{
			if (typeof assertion.actualValue !== "number" && typeof assertion.actualValue !== "bigint")
			{
				fail(`Expected ${assertion.name} to be a number or a bigint`);
			}

			if (assertion.actualValue > max)
			{
				fail(`Expected ${assertion.name} to be at most ${max.toString()}`);
			}
		}
	);
}

export { fluent_most };
