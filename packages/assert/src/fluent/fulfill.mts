import { doesNotReject, fail } from "node:assert/strict";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";

function fluent_fulfill(assertion: FluentAssertionInternal): FluentAssertionInternal
{
	assertion.disableNegation("fulfill", "reject");

	const ASSERTION: FluentAssertionInternal = assertion.createAssertion("returned value");

	assertion.appendAction(
		async (): Promise<void> =>
		{
			if (!(assertion.actualValue instanceof Promise))
			{
				fail(`Expected ${assertion.name} to be a promise`);
			}

			await doesNotReject(assertion.actualValue, `Expected ${assertion.name} to fulfill`);

			ASSERTION.setValue(await assertion.actualValue);
		}
	);

	return ASSERTION;
}

export { fluent_fulfill };
