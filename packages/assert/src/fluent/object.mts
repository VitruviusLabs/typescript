import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { isObject } from "./predicate/is-object.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_object(assertion: FluentAssertionInternal): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (isObject(assertion.actualValue))
				{
					fail(`Expected ${assertion.name} to not be an object`);
				}

				return;
			}

			if (!isObject(assertion.actualValue))
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be an object, but got ${TYPE}`);
			}
		}
	);
}

export { fluent_object };
