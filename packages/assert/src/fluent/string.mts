import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_string(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (typeof assertion.actualValue === "string")
				{
					fail(`Expected ${assertion.name} to not be a string`);
				}

				return;
			}

			if (typeof assertion.actualValue !== "string")
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be a string, but got ${TYPE}`);
			}
		}
	);
}

export { fluent_string };
