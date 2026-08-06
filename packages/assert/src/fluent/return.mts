import { doesNotThrow, fail } from "node:assert/strict";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { isFunction } from "./predicate/is-function.mjs";

function fluent_return(assertion: FluentAssertionInternal): FluentAssertionInternal
{
	assertion.disableNegation("return", "throw");

	const ASSERTION: FluentAssertionInternal = assertion.createAssertion("returned value");

	assertion.appendAction(
		(): void =>
		{
			const CALLABLE: unknown = assertion.actualValue;

			if (!isFunction(CALLABLE))
			{
				fail(`Expected ${assertion.name} to be a function`);
			}

			let result: unknown = undefined;

			doesNotThrow(
				(): void =>
				{
					/* Retrieve the returned value */
					result = CALLABLE();
				},
				`Expected ${assertion.name} to return`
			);

			ASSERTION.setValue(result);
		}
	);

	return ASSERTION;
}

export { fluent_return };
