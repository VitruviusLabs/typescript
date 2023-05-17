import { hasNullableProperty } from "../../TypeGuard/hasNullableProperty.mjs";

import { isDefined } from "../../TypeGuard/isDefined.mjs";

import { buildCause } from "./buildCause.mjs";

import type { TypeAssertionPropertyDescriptor } from "../../index.mjs";

function validateProperty(value: Record<string, unknown>, key: string, property_descriptor: TypeAssertionPropertyDescriptor<unknown>): void
{
	if (!hasNullableProperty(value, key))
	{
		if (property_descriptor.optional ?? false)
		{
			return;
		}

		throw new Error(`missing required property "${key}"`);
	}

	if (!isDefined(value[key]))
	{
		if (property_descriptor.nullable ?? false)
		{
			return;
		}

		throw new Error(`property "${key}" is not nullable`);
	}

	try
	{
		property_descriptor.test(value[key]);
	}
	catch (error: unknown)
	{
		throw new Error(`property "${key}" is invalid`, buildCause(error));
	}
}

export { validateProperty };
