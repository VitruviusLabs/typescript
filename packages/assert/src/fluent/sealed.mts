import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";

function fluent_sealed(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (Object.isSealed(assertion.actualValue))
				{
					fail(`Expected ${assertion.name} to not be sealed`);
				}

				return;
			}

			if (!Object.isSealed(assertion.actualValue))
			{
				fail(`Expected ${assertion.name} to be sealed`);
			}
		}
	);
}

export { fluent_sealed };
