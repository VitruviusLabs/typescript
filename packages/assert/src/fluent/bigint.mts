import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_bigint(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (typeof assertion.actualValue === "bigint")
				{
					fail(`Expected ${assertion.name} to not be a bigint`);
				}

				return;
			}

			if (typeof assertion.actualValue !== "bigint")
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be a bigint, but got ${TYPE}`);
			}
		}
	);
}

export { fluent_bigint };
