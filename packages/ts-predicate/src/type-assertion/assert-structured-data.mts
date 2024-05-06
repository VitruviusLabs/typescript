import type { StructuredDataDescriptor } from "../definition/interface/structured-data-descriptor.mjs";
import type { StructuredDataOptions } from "../definition/interface/structured-data-options.mjs";
import type { StructuredDataPropertyDescriptor } from "../definition/type/structured-data-property-descriptor.mjs";
import { buildStructuredDataOptions } from "../utils/build-structured-data-options.mjs";
import { assertRecord } from "./assert-record.mjs";
import { validateProperty } from "./utils/validate-property.mjs";
import { ValidationError } from "./_index.mjs";
import { rethrowUnexpectedError } from "../utils/rethrow-unexpected-error.mjs";
import { getStructuredDataPropertyDescriptor } from "../utils/get-structured-data-property-descriptor.mjs";

function assertStructuredData<Type>(
	value: unknown,
	descriptor: StructuredDataDescriptor<Type>,
	options?: StructuredDataOptions
): asserts value is Type
{
	assertRecord(value);

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
			const PROPERTY_DESCRIPTOR: StructuredDataPropertyDescriptor<unknown> = getStructuredDataPropertyDescriptor(descriptor, key);

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

export { assertStructuredData };
