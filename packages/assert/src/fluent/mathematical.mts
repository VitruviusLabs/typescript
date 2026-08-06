import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_mathematical(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (typeof assertion.actualValue === "number")
				{
					fail(`Expected ${assertion.name} to not be a number`);
				}

				return;
			}

			if (typeof assertion.actualValue !== "number" || Number.isNaN(assertion.actualValue))
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be a number, but got ${TYPE}`);
			}
		}
	);
}

export { fluent_mathematical };
