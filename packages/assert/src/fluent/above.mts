import { fail } from "node:assert/strict";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";

function fluent_above(assertion: FluentAssertionInternal, min: bigint | number): void
{
	assertion.disableNegation("above", "most");

	assertion.appendAction(
		(): void =>
		{
			if (typeof assertion.actualValue !== "number" && typeof assertion.actualValue !== "bigint")
			{
				fail(`Expected ${assertion.name} to be a number or a bigint`);
			}

			if (assertion.actualValue <= min)
			{
				fail(`Expected ${assertion.name} to be above ${min.toString()}`);
			}
		}
	);
}

export { fluent_above };
