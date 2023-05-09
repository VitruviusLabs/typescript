import { hasNullableProperty, isDefined } from "../TypeGuard/_index.js";

import { hasAllowedKeys } from "./hasAllowedKeys.js";

import { isRecord } from "./isRecord.js";

import type {
	TypeAssertionPropertyDescriptor,
	TypeAssertionStructureDescriptor,
} from "../Types/_index.js";

function isStructuredData<Type>(
	value: unknown,
	descriptor: TypeAssertionStructureDescriptor<Type>
): asserts value is Type
{
	isRecord(value);

	const DESCRIPTOR_KEYS: Array<string> = Object.keys(descriptor);

	hasAllowedKeys(value, DESCRIPTOR_KEYS);

	DESCRIPTOR_KEYS.forEach(
		(key: string): void =>
		{
			// @ts-expect-error: Key mapping
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Key mapping
			const PROPERTY_DESCRIPTOR: TypeAssertionPropertyDescriptor<unknown> = descriptor[key];

			if (!hasNullableProperty(value, key))
			{
				if (PROPERTY_DESCRIPTOR.optional ?? false)
				{
					return;
				}

				throw new Error(`missing required property: ${key}`);
			}

			if (!isDefined(value[key]))
			{
				if (PROPERTY_DESCRIPTOR.nullable ?? false)
				{
					return;
				}

				throw new Error(`property ${key} is not nullable`);
			}

			try
			{
				PROPERTY_DESCRIPTOR.test(value[key]);
			}
			catch (error: unknown)
			{
				throw new Error(
					`property ${key} is invalid`,
					/* c8 ignore next 2 */
					// Stryker disable next-line ObjectLiteral: cause
					(error instanceof Error) ? { cause: error } : undefined
				);
			}
		}
	);
}

export { isStructuredData };
