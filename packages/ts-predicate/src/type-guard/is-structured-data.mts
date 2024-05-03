import type { StructuredDataDescriptor, StructuredDataOptions, StructuredDataPropertyDescriptor } from "../definition/_index.mjs";
import { buildStructuredDataOptions } from "../utils/build-structured-data-options.mjs";
import { getStructuredDataPropertyDescriptor } from "../utils/get-structured-data-property-descriptor.mjs";
import { hasAllowedKeys } from "./has-allowed-keys.mjs";
import { hasNullableProperty } from "./has-nullable-property.mjs";
import { isDefined } from "./is-defined.mjs";
import { isRecord } from "./is-record.mjs";
import { itemGuard } from "./utils/item-guard.mjs";

function isStructuredData<Type>(
	value: unknown,
	descriptor: StructuredDataDescriptor<Type>,
	options?: StructuredDataOptions
): value is Type
{
	if (!isRecord(value))
	{
		return false;
	}

	const OPTIONS: Required<StructuredDataOptions> = buildStructuredDataOptions(options);

	const DESCRIPTOR_KEYS: Array<string> = Object.keys(descriptor);

	if (!OPTIONS.allowExtraneousProperties && !hasAllowedKeys(value, DESCRIPTOR_KEYS))
	{
		return false;
	}

	return DESCRIPTOR_KEYS.every(
		(key: string): boolean =>
		{
			const PROPERTY_DESCRIPTOR: StructuredDataPropertyDescriptor<unknown> = getStructuredDataPropertyDescriptor(descriptor, key);

			if (PROPERTY_DESCRIPTOR.ignore ?? false)
			{
				return true;
			}

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
