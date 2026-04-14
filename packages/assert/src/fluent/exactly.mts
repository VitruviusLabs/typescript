import { notStrictEqual, strictEqual } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";

function fluent_exactly(assertion: FluentAssertionInternal, expected: unknown): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				notStrictEqual(assertion.actualValue, expected, `Expected ${assertion.name} to be strictly different from the expected value`);

				return;
			}

			strictEqual(assertion.actualValue, expected, `Expected ${assertion.name} to be strictly equal to the expected value`);
		}
	);
}

export { fluent_exactly };
