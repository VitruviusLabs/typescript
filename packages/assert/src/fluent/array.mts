import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_array(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (Array.isArray(assertion.actualValue))
				{
					fail(`Expected ${assertion.name} to not be an array`);
				}

				return;
			}

			if (!Array.isArray(assertion.actualValue))
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be an array, but got ${TYPE}`);
			}
		}
	);
}

export { fluent_array };
