import { hasAllowedKeys } from "./hasAllowedKeys.js";

import { hasNullableProperty } from "./hasNullableProperty.js";

import { isDefined } from "./isDefined.js";

import { isRecord } from "./isRecord.js";

import type {
	TypeGuardPropertyDescriptor,
	TypeGuardStructureDescriptor,
} from "../Types/_index.js";

function isStructuredData<Type>(
	value: unknown,
	descriptor: TypeGuardStructureDescriptor<Type>
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
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Key mapping
			const PROPERTY_DESCRIPTOR: TypeGuardPropertyDescriptor<unknown> = descriptor[key];

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
