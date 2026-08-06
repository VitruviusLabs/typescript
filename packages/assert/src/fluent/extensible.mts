import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";

function fluent_extensible(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (Object.isExtensible(assertion.actualValue))
				{
					fail(`Expected ${assertion.name} to not be extensible`);
				}

				return;
			}

			if (!Object.isExtensible(assertion.actualValue))
			{
				fail(`Expected ${assertion.name} to be extensible`);
			}
		}
	);
}

export { fluent_extensible };
