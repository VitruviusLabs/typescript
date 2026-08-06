import { fail, notStrictEqual, strictEqual } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../../internal/fluent-assertion.mjs";
import { isSpy } from "./predicate/is-spy.mjs";

function fluent_called(assertion: FluentAssertionInternal, count: number | undefined): void
{
	if (count !== undefined && count < 0)
	{
		throw new RangeError("Call count must be a non-negative integer");
	}

	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (!isSpy(assertion.actualValue))
			{
				fail(`Expected ${assertion.name} to be a spy`);
			}

			if (flags.negation)
			{
				if (count === undefined)
				{
					strictEqual(assertion.actualValue.called, false, `Expected ${assertion.name} to not have been called`);

					return;
				}

				notStrictEqual(assertion.actualValue.callCount, count, `Expected ${assertion.name} call count to be different than ${count.toString()}`);

				return;
			}

			if (count === undefined)
			{
				strictEqual(assertion.actualValue.called, true, `Expected ${assertion.name} to have been called at least once`);

				return;
			}

			strictEqual(assertion.actualValue.callCount, count, `Expected ${assertion.name} call count to be exactly ${count.toString()}`);
		}
	);
}

export { fluent_called };
