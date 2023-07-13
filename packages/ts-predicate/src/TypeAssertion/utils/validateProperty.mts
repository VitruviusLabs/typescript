import { toError } from "../../Helper/toError.mjs";

import { hasNullableProperty } from "../../TypeGuard/hasNullableProperty.mjs";

import { isDefined } from "../../TypeGuard/isDefined.mjs";

import type { StructuredDataPropertyDescriptor } from "../../types/_index.mjs";

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
		property_descriptor.test(value[key]);
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
