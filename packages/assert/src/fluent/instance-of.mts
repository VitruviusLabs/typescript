import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { getType } from "./utility/get-type.mjs";

function fluent_instance_of(assertion: FluentAssertionInternal, class_constructor: abstract new (...args: ReadonlyArray<never>) => object): void
{
	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (flags.negation)
			{
				if (assertion.actualValue instanceof class_constructor)
				{
					fail(`Expected ${assertion.name} to not be an instance of ${class_constructor.name}`);
				}

				return;
			}

			if (!(assertion.actualValue instanceof class_constructor))
			{
				const TYPE: string = getType(assertion.actualValue);

				fail(`Expected ${assertion.name} to be an instance of ${class_constructor.name}, but got ${TYPE}`);
			}
		}
	);
}

export { fluent_instance_of };
