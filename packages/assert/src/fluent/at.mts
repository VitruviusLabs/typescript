import { fail } from "node:assert/strict";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";

function fluent_at(assertion: FluentAssertionInternal, index: number): FluentAssertionInternal
{
	assertion.disableNegation("at");

	const ITEM_NAME: string = `item #${index.toString()}`;

	const ASSERTION: FluentAssertionInternal = assertion.createAssertion(ITEM_NAME);

	assertion.appendAction(
		(): void =>
		{
			if (!Array.isArray(assertion.actualValue))
			{
				fail(`Expected ${assertion.name} to be an array`);
			}

			if (index >= assertion.actualValue.length)
			{
				fail(`Expected ${assertion.name} to have a at least ${(index + 1).toString()} items`);
			}

			ASSERTION.setValue(assertion.actualValue[index]);
		}
	);

	return ASSERTION;
}

export { fluent_at };
