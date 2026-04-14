import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_nullish(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			const NULLISH_VALUES: Array<unknown> = [undefined, null, NaN];

			if (flags.negation)
			{
				if (NULLISH_VALUES.includes(assertion.actualValue))
				{
					const TYPE: string = getType(assertion.actualValue);

					fail(`Expected ${assertion.name} to not be undefined, null, or NaN, but got ${TYPE}`);
				}

				return;
			}

			if (!NULLISH_VALUES.includes(assertion.actualValue))
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be undefined, null, or NaN, but got ${TYPE}`);
			}
		}
	);
}

export { fluent_nullish };
