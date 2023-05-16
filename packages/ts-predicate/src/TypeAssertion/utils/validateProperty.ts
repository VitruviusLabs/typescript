import { hasNullableProperty } from "../../TypeGuard/hasNullableProperty.js";

import { isDefined } from "../../TypeGuard/isDefined.js";

import { buildCause } from "./buildCause.js";

import type { TypeAssertionPropertyDescriptor } from "../../index.js";

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
