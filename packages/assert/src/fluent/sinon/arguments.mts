import { fail } from "node:assert/strict";
import type { FluentAssertionInternal } from "../../internal/fluent-assertion.mjs";
import { isSpyCall } from "./predicate/is-spy-call.mjs";

function fluent_arguments(assertion: FluentAssertionInternal): FluentAssertionInternal
{
	assertion.disableNegation("arguments");

	const ASSERTION: FluentAssertionInternal = assertion.createAssertion("arguments");

	assertion.appendAction(
		(): void =>
		{
			if (!isSpyCall(assertion.actualValue))
			{
				fail(`Expected ${assertion.name} to be a spy call`);
			}

			ASSERTION.setValue(assertion.actualValue.args);
		}
	);

	return ASSERTION;
}

export { fluent_arguments };
