import { fail } from "node:assert/strict";
import type { AssertionFlagsInterface } from "../internal/definition/interface/assertion-flags.interface.mjs";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { isObject } from "./predicate/is-object.mjs";

function fluent_member(assertion: FluentAssertionInternal, key: string | symbol): void
{
	let property_name: string = "";

	if (typeof key === "symbol")
	{
		property_name = `property ${key.toString()}`;
	}
	else
	{
		property_name = `property "${key}"`;
	}

	assertion.appendAction(
		(flags: AssertionFlagsInterface): void =>
		{
			if (!isObject(assertion.actualValue))
			{
				fail(`Expected ${assertion.name} to be an object`);
			}

			if (flags.negation)
			{
				if (key in assertion.actualValue)
				{
					fail(`Expected ${assertion.name} to not have a ${property_name}`);
				}

				return;
			}

			if (!(key in assertion.actualValue))
			{
				fail(`Expected ${property_name} to exist`);
			}
		}
	);
}

export { fluent_member };
