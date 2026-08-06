import { fail, notStrictEqual, strictEqual } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../../internal/fluent-assertion.mjs";
import { isSpyCall } from "./predicate/is-spy-call.mjs";

function fluent_context(assertion: FluentAssertionInternal, assertionArg: object | undefined): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (!isSpyCall(assertion.actualValue))
			{
				fail(`Expected ${assertion.name} to be a spy call`);
			}

			if (flags.negation)
			{
				notStrictEqual(assertion.actualValue.thisValue, assertionArg, `Expected ${assertion.name} context to not be exactly the expected context`);

				return;
			}

			strictEqual(assertion.actualValue.thisValue, assertionArg, `Expected ${assertion.name} context to be exactly the expected context`);
		}
	);
}

export { fluent_context };
