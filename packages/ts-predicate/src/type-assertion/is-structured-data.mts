import type { StructuredDataDescriptor, StructuredDataOptions } from "../definition/_index.mjs";
import { buildStructuredDataOptions } from "../utils/build-structured-data-options.mjs";
import { isStructuredDataPropertyDescriptor } from "../utils/is-structured-data-property-descriptor.mjs";
import { isRecord } from "./is-record.mjs";
import { validateProperty } from "./utils/validate-property.mjs";
import { ValidationError } from "./_index.mjs";
import { rethrowUnexpectedError } from "../utils/rethrow-unexpected-error.mjs";

function isStructuredData<Type>(
	value: unknown,
	descriptor: StructuredDataDescriptor<Type>,
	options?: StructuredDataOptions
): asserts value is Type
{
	isRecord(value);

	const OPTIONS: Required<StructuredDataOptions> = buildStructuredDataOptions(options);

	const DESCRIPTOR_KEYS: Array<string> = Object.keys(descriptor);

	const ERRORS: Array<ValidationError> = [];

	if (!OPTIONS.allowExtraneousProperties)
	{
		Object.keys(value).forEach(
			(key: string): void =>
			{
				if (!DESCRIPTOR_KEYS.includes(key))
				{
					ERRORS.push(new ValidationError(`The value has an extraneous property "${key}".`));
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
				rethrowUnexpectedError(error);

				ERRORS.push(error);
			}
		}
	);

	if (ERRORS.length > 0)
	{
		throw new ValidationError("The value is an object, but some properties are incorrect.", ERRORS);
	}
}

export { isStructuredData };
