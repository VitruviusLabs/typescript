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
			if (typeof assertion.actualValue === "string")
			{
				ASSERTION.setValue(assertion.actualValue.length);

				return;
			}

			if (Array.isArray(assertion.actualValue))
			{
				ASSERTION.setValue(assertion.actualValue.length);

				return;
			}

			if (assertion.actualValue instanceof Map)
			{
				ASSERTION.setValue(assertion.actualValue.size);

				return;
			}

			if (assertion.actualValue instanceof Set)
			{
				ASSERTION.setValue(assertion.actualValue.size);

				return;
			}

			const TYPE: string = getType(assertion.actualValue);

			fail(`Expected ${assertion.name} to be a string, Array, Map, or Set, but got ${TYPE}`);
		}
	);

	return ASSERTION;
}

export { fluent_length };
