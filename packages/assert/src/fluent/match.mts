import { doesNotMatch, fail, match } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_match(assertion: FluentAssertionInternal, pattern: RegExp): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (typeof assertion.actualValue !== "string")
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be a string, but got ${TYPE}`);
			}

			if (flags.negation)
			{
				doesNotMatch(assertion.actualValue, pattern, `Expected ${assertion.name} to not match ${pattern.toString()}`);

				return;
			}

			match(assertion.actualValue, pattern, `Expected ${assertion.name} to match ${pattern.toString()}`);
		}
	);
}

export { fluent_match };
