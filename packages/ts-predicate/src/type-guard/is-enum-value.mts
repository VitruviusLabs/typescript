function isEnumValue<Type>(value: unknown, enum_values: Array<Type>): value is Type
{
	// @ts-expect-error: [].includes() should not care about the type of the parameter.
	return enum_values.includes(value);
}

export { isEnumValue };
