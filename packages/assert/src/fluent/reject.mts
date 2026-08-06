import { fail, rejects } from "node:assert/strict";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import type { VoidAssertionInternal } from "../internal/void-assertion.mjs";
import { ErrorPredicate } from "./utility/error-predicate.mjs";

function fluent_reject(assertion: FluentAssertionInternal, predicate: string | RegExp | ErrorConstructor | Error | undefined): VoidAssertionInternal
{
	assertion.disableNegation("reject", "fulfill");

	assertion.appendAction(
		async (): Promise<void> =>
		{
			if (!(assertion.actualValue instanceof Promise))
			{
				fail(`Expected ${assertion.name} to be a promise`);
			}

			const MESSAGE: string = `Expected ${assertion.name} to reject`;

			await rejects(assertion.actualValue, ErrorPredicate.Create(MESSAGE, predicate), MESSAGE);
		}
	);

	return assertion.createVoidAssertion();
}

export { fluent_reject };
