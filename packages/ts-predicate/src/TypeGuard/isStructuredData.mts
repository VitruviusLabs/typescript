import { isStructuredDataPropertyDescriptor } from "../utils/isStructuredDataPropertyDescriptor.mjs";

import { hasAllowedKeys } from "./hasAllowedKeys.mjs";

import { hasNullableProperty } from "./hasNullableProperty.mjs";

import { isDefined } from "./isDefined.mjs";

import { isRecord } from "./isRecord.mjs";

import { itemGuard } from "./utils/itemGuard.mjs";

import type { StructuredDataDescriptor } from "../types/_index.mjs";

function isStructuredData<Type>(
	value: unknown,
	descriptor: StructuredDataDescriptor<Type>
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

			isStructuredDataPropertyDescriptor(PROPERTY_DESCRIPTOR, key);

			if (!hasNullableProperty(value, key))
			{
				return PROPERTY_DESCRIPTOR.optional ?? false;
			}

			if (!isDefined(value[key]))
			{
				return PROPERTY_DESCRIPTOR.nullable ?? false;
			}

			return itemGuard(value[key], PROPERTY_DESCRIPTOR.test);
		}
	);
}

export { isStructuredData };
