import { fail } from "node:assert/strict";
import type { FluentAssertionInternal } from "../internal/fluent-assertion.mjs";
import { isObject } from "./predicate/is-object.mjs";

function fluent_property(assertion: FluentAssertionInternal, key: string | symbol): FluentAssertionInternal
{
	assertion.disableNegation("property");

	let property_name: string = "";

	if (typeof key === "symbol")
	{
		property_name = `property ${key.toString()}`;
	}
	else
	{
		property_name = `property "${key}"`;
	}

	const ASSERTION: FluentAssertionInternal = assertion.createAssertion(property_name);

	assertion.appendAction(
		(): void =>
		{
			if (!isObject(assertion.actualValue))
			{
				fail(`Expected ${assertion.name} to be an object`);
			}

			if (!(key in assertion.actualValue))
			{
				fail(`Expected ${property_name} to exist`);
			}

			ASSERTION.setValue(Reflect.get(assertion.actualValue, key));
		}
	);

	return ASSERTION;
}

export { fluent_property };
