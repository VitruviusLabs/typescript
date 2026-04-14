import { deepStrictEqual, notDeepStrictEqual } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";

function fluent_resemble(assertion: FluentAssertionInternal, expected: unknown): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				notDeepStrictEqual(assertion.actualValue, expected, `Expected ${assertion.name} to be different from the expected value`);

				return;
			}

			deepStrictEqual(assertion.actualValue, expected, `Expected ${assertion.name} to resemble the expected value`);
		}
	);
}

export { fluent_resemble };
