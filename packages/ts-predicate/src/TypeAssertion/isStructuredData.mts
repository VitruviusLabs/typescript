import { isStructuredDataPropertyDescriptor } from "../utils/isStructuredDataPropertyDescriptor.mjs";

import { buildError } from "./utils/buildError.mjs";

import { validateProperty } from "./utils/validateProperty.mjs";

import type { StructuredDataDescriptor } from "../Types/_index.mjs";

function isStructuredData<Type>(value: unknown, descriptor: StructuredDataDescriptor<Type>): asserts value is Type
{
	if (typeof value !== "object" || value === null)
	{
		throw new Error("The value must be an object.");
	}

	const DESCRIPTOR_KEYS: Array<string> = Object.keys(descriptor);

	const ERRORS: Array<Error> = [];

	const EXTRANEOUS_KEYS: Array<string> = Object.keys(value).filter(
		(key: string): boolean =>
		{
			return !DESCRIPTOR_KEYS.includes(key);
		}
	);

	if (EXTRANEOUS_KEYS.length > 0)
	{
		ERRORS.push(
			...EXTRANEOUS_KEYS.map(
				(key: string): Error =>
				{
					return new Error(`The value has an extraneous property "${key}".`);
				}
			)
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
				if (error instanceof Error)
				{
					ERRORS.push(error);

					return;
				}

				throw new Error(
					`An error occurred while validating the property "${key}".`,
					{ cause: buildError(error) }
				);
			}
		}
	);

	if (ERRORS.length > 0)
	{
		throw new AggregateError(ERRORS, "The value is an object, but some properties are incorrect.");
	}
}

export { isStructuredData };
