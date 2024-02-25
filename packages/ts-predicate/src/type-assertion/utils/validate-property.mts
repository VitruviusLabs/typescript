import { toError } from "../../helper/to-error.mjs";
import { hasNullableProperty } from "../../type-guard/has-nullable-property.mjs";
import { isDefined } from "../../type-guard/is-defined.mjs";
import { itemAssertion } from "./item-assertion.mjs";
import type { StructuredDataPropertyDescriptor } from "../../definition/_index.mjs";

function validateProperty(value: object, key: string, property_descriptor: StructuredDataPropertyDescriptor<unknown>): void
{
	if (!hasNullableProperty(value, key))
	{
		if (property_descriptor.optional ?? false)
		{
			return;
		}

		throw new Error(`The required property "${key}" is missing.`);
	}

	if (!isDefined(value[key]))
	{
		if (property_descriptor.nullable ?? false)
		{
			return;
		}

		throw new Error(`The property "${key}" must not have a nullish value (undefined, null, or NaN).`);
	}

	try
	{
		itemAssertion(value[key], property_descriptor.test);
	}
	catch (error: unknown)
	{
		throw new Error(
			`The property "${key}" has an incorrect value.`,
			{ cause: toError(error) }
		);
	}
}

export { validateProperty };
