import { hasAllowedKeys } from "./hasAllowedKeys.mjs";

import { hasNullableProperty } from "./hasNullableProperty.mjs";

import { isDefined } from "./isDefined.mjs";

import { isRecord } from "./isRecord.mjs";

import { isTypeGuardPropertyDescriptor } from "./utils/isTypeAssertionStructuredDataDescriptor.mjs";

import type { TypeGuardStructuredDataDescriptor } from "../Types/_index.mjs";

function isStructuredData<Type>(
	value: unknown,
	descriptor: TypeGuardStructuredDataDescriptor<Type>
): value is Type
{
	if (!isRecord(value))
	{
		return false;
	}

	const DESCRIPTOR_KEYS: Array<string> = Object.keys(descriptor);

	if (!hasAllowedKeys(value, DESCRIPTOR_KEYS))
	{
		return false;
	}

	return DESCRIPTOR_KEYS.every(
		(key: string): boolean =>
		{
			// @ts-expect-error -- Key mapping
			const PROPERTY_DESCRIPTOR: unknown = descriptor[key];

			isTypeGuardPropertyDescriptor(PROPERTY_DESCRIPTOR, key);

			if (!hasNullableProperty(value, key))
			{
				return PROPERTY_DESCRIPTOR.optional ?? false;
			}

			if (!isDefined(value[key]))
			{
				return PROPERTY_DESCRIPTOR.nullable ?? false;
			}

			return PROPERTY_DESCRIPTOR.test(value[key]);
		}
	);
}

export { isStructuredData };
