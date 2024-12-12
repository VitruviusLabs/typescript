function isNullish<Type>(value: Type): value is Type & (null | undefined)
{
	return value === undefined || value === null || Number.isNaN(value);
}

export { isNullish };
