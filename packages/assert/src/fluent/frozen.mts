import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";

function fluent_frozen(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (Object.isFrozen(assertion.actualValue))
				{
					fail(`Expected ${assertion.name} to not be frozen`);
				}

				return;
			}

			if (!Object.isFrozen(assertion.actualValue))
			{
				fail(`Expected ${assertion.name} to be frozen`);
			}
		}
	);
}

export { fluent_frozen };
