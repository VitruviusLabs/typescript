import { fail, throws } from "node:assert/strict";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import type { VoidAssertionInternal } from "../internal/void-assertion.mjs";
import { isFunction } from "./predicate/is-function.mjs";
import { ErrorPredicate } from "./utility/error-predicate.mjs";

function fluent_throw(assertion: FluentAssertionInternal, predicate?: Error | RegExp | string | typeof Error): VoidAssertionInternal
{
	assertion.disableNegation("throw", "return");

	assertion.appendAction(
		(): void =>
		{
			if (!isFunction(assertion.actualValue))
			{
				fail(`Expected ${assertion.name} to be a function`);
			}

			const MESSAGE: string = `Expected ${assertion.name} to throw`;

			throws(assertion.actualValue, ErrorPredicate.Create(MESSAGE, predicate), MESSAGE);
		}
	);

	return assertion.createVoidAssertion();
}

export { fluent_throw };
