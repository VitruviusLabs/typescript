import { fail } from "node:assert";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_integer(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (Number.isSafeInteger(assertion.actualValue))
				{
					fail(`Expected ${assertion.name} to not be an integer`);
				}

				return;
			}

			if (!Number.isSafeInteger(assertion.actualValue))
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be an integer, but got ${TYPE}`);
			}
		}
	);
}

export { fluent_integer };
