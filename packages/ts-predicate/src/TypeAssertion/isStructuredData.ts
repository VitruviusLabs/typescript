import { hasAllowedKeys } from "./hasAllowedKeys.js";

import { isRecord } from "./isRecord.js";

import { buildError } from "./utils/buildError.js";

import { isTypeAssertionStructuredDataDescriptor } from "./utils/isTypeAssertionStructuredDataDescriptor.js";

import { validateProperty } from "./utils/validateProperty.js";

import type { TypeAssertionStructuredDataDescriptor } from "../Types/_index.js";

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
