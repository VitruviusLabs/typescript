import { fail } from "node:assert/strict";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_length(assertion: FluentAssertionInternal): FluentAssertionInternal
{
	assertion.disableNegation("length");

	const ASSERTION: FluentAssertionInternal = assertion.createAssertion("length");

	assertion.appendAction(
		(): void =>
		{
			if (typeof assertion.actualValue !== "string")
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be a string, but got ${TYPE}`);
			}

			ASSERTION.setValue(assertion.actualValue.length);
		}
	);

	return ASSERTION;
}

export { fluent_length };
