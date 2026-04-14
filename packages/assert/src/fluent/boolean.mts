import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_boolean(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (typeof assertion.actualValue === "boolean")
				{
					fail(`Expected ${assertion.name} to not be a boolean`);
				}

				return;
			}

			if (typeof assertion.actualValue !== "boolean")
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be a boolean, but got ${TYPE}`);
			}
		}
	);
}

export { fluent_boolean };
