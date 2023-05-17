import { hasAllowedKeys } from "./hasAllowedKeys.mjs";

import { isRecord } from "./isRecord.mjs";

import { buildError } from "./utils/buildError.mjs";

import { isTypeAssertionStructuredDataDescriptor } from "./utils/isTypeAssertionStructuredDataDescriptor.mjs";

import { validateProperty } from "./utils/validateProperty.mjs";

import type { TypeAssertionStructuredDataDescriptor } from "../Types/_index.mjs";

function isStructuredData<Type>(
	value: unknown,
	descriptor: TypeAssertionStructuredDataDescriptor<Type>
): asserts value is Type
{
	isRecord(value);

	const DESCRIPTOR_KEYS: Array<string> = Object.keys(descriptor);

	hasAllowedKeys(value, DESCRIPTOR_KEYS);

	const ERRORS: Array<Error> = [];

	DESCRIPTOR_KEYS.forEach(
		(key: string): void =>
		{
			try
			{
				// @ts-expect-error: Key mapping
				const PROPERTY_DESCRIPTOR: unknown = descriptor[key];

				isTypeAssertionStructuredDataDescriptor(PROPERTY_DESCRIPTOR, key);

				validateProperty(value, key, PROPERTY_DESCRIPTOR);
			}
			catch (error: unknown)
			{
				ERRORS.push(buildError(error, key));
			}
		}
	);

	if (ERRORS.length > 0)
	{
		throw new AggregateError(ERRORS, "Some properties are invalid");
	}
}

export { isStructuredData };
