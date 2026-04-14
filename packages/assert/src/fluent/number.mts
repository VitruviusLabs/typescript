import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_number(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (Number.isFinite(assertion.actualValue))
				{
					fail(`Expected ${assertion.name} to not be a finite number`);
				}

				return;
			}

			if (!Number.isFinite(assertion.actualValue))
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be a finite number, but got ${TYPE}`);
			}
		}
	);
}

export { fluent_number };
