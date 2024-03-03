import type { StructuredDataPropertyDescriptor } from "../../definition/_index.mjs";
import { hasNullableProperty } from "../../type-guard/has-nullable-property.mjs";
import { isDefined } from "../../type-guard/is-defined.mjs";
import { itemAssertion } from "./item-assertion.mjs";
import { ValidationError } from "./validation-error.mjs";
import { rethrowUnexpectedError } from "../../utils/rethrow-unexpected-error.mjs";

function validateProperty(value: object, key: string, property_descriptor: StructuredDataPropertyDescriptor<unknown>): void
{
	if (!hasNullableProperty(value, key))
	{
		if (property_descriptor.optional ?? false)
		{
			return;
		}

		throw new ValidationError(`The required property "${key}" is missing.`);
	}

	if (!isDefined(value[key]))
	{
		if (property_descriptor.nullable ?? false)
		{
			return;
		}

		throw new ValidationError(`The property "${key}" must not have a nullish value (undefined, null, or NaN).`);
	}

	try
	{
		itemAssertion(value[key], property_descriptor.test);
	}
	catch (error: unknown)
	{
		rethrowUnexpectedError(error);

		throw new ValidationError(
			`The property "${key}" has an incorrect value.`,
			[error]
		);
	}
}

export { validateProperty };
