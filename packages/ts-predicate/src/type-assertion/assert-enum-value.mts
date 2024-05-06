import { ValidationError } from "./_index.mjs";

function assertEnumValue<Type>(value: unknown, enum_values: Array<Type>, enum_name?: string): asserts value is Array<Type>
{
	// @ts-expect-error: [].includes() should not care about the type of the parameter.
	if (!enum_values.includes(value))
	{
		if (enum_name !== undefined)
		{
			throw new ValidationError(`The value must be a ${enum_name}.`);
		}

		throw new ValidationError(`The value must be one of the following: ${enum_values.join(", ")}.`);
	}
}

export { assertEnumValue };
