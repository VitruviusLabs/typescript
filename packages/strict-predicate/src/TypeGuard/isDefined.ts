function isDefined<Type>(value: Type): value is NonNullable<Type>
{
	return value !== undefined && value !== null && !Number.isNaN(value);
}

export { isDefined };
