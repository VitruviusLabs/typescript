import { doesNotMatch, fail, match } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_numerical(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			const NUMERICAL_PATTERN: RegExp = /^-?(?:[1-9][0-9]*|0)(?:\.[0-9]+)?$/;

			if (typeof assertion.actualValue !== "string")
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be a string, but got ${TYPE}`);
			}

			if (flags.negation)
			{
				doesNotMatch(assertion.actualValue, NUMERICAL_PATTERN, `Expected ${assertion.name} to not be a numerical string`);

				return;
			}

			match(assertion.actualValue, NUMERICAL_PATTERN, `Expected ${assertion.name} to be a numerical string`);
		}
	);
}

export { fluent_numerical };
