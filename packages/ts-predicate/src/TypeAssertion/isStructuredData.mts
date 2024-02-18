import { toError } from "../Helper/toError.mjs";

import { buildStructuredDataOptions } from "../utils/buildStructuredDataOptions.mjs";

import { isStructuredDataPropertyDescriptor } from "../utils/isStructuredDataPropertyDescriptor.mjs";

import { isRecord } from "./isRecord.mjs";

import { validateProperty } from "./utils/validateProperty.mjs";

import type { StructuredDataDescriptor, StructuredDataOptions } from "../types/_index.mjs";

function isStructuredData<Type>(
	value: unknown,
	descriptor: StructuredDataDescriptor<Type>,
	options?: StructuredDataOptions
): asserts value is Type
{
	isRecord(value);

	const OPTIONS: Required<StructuredDataOptions> = buildStructuredDataOptions(options);

	const DESCRIPTOR_KEYS: Array<string> = Object.keys(descriptor);

	const ERRORS: Array<Error> = [];

	if (!OPTIONS.allowExtraneousProperties)
	{
		Object.keys(value).forEach(
			(key: string): void =>
			{
				if (!DESCRIPTOR_KEYS.includes(key))
				{
					ERRORS.push(new Error(`The value has an extraneous property "${key}".`));
				}
			}
		);
	}

	DESCRIPTOR_KEYS.forEach(
		(key: string): void =>
		{
			// @ts-expect-error: Key mapping
			const PROPERTY_DESCRIPTOR: unknown = descriptor[key];

			isStructuredDataPropertyDescriptor(PROPERTY_DESCRIPTOR, key);

			try
			{
				validateProperty(value, key, PROPERTY_DESCRIPTOR);
			}
			catch (error: unknown)
			{
				ERRORS.push(toError(error));
			}
		}
	);

	if (ERRORS.length > 0)
	{
		throw new AggregateError(ERRORS, "The value is an object, but some properties are incorrect.");
	}
}

export { isStructuredData };
