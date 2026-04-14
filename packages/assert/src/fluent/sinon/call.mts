import { fail } from "node:assert/strict";
import type { FluentAssertionInternal } from "../../internal/fluent-assertion.mjs";
import { isSpy } from "./predicate/is-spy.mjs";

function fluent_call(assertion: FluentAssertionInternal, nth: number | "last"): FluentAssertionInternal
{
	assertion.disableNegation("call");

	if (nth !== "last" && (!Number.isSafeInteger(nth) || nth < 1))
	{
		throw new RangeError('Call number must be a positive integer or "last"');
	}

	let call_name: string = "last call";

	if (nth !== "last")
	{
		call_name = `call #${nth.toString()}`;
	}

	const ASSERTION: FluentAssertionInternal = assertion.createAssertion(call_name);

	assertion.appendAction(
		(): void =>
		{
			if (!isSpy(assertion.actualValue))
			{
				fail(`Expected ${assertion.name} to be a spy`);
			}

			if (nth === "last")
			{
				if (!assertion.actualValue.called)
				{
					fail(`Expected ${assertion.name} to have been called at least once`);
				}

				ASSERTION.setValue(assertion.actualValue.lastCall);

				return;
			}

			if (nth > assertion.actualValue.callCount)
			{
				fail(`Expected ${assertion.name} to have been called at least ${nth.toString()} times`);
			}

			ASSERTION.setValue(assertion.actualValue.getCall(nth - 1));
		}
	);

	return ASSERTION;
}

export { fluent_call };
