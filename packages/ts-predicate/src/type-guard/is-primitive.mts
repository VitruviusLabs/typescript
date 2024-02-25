function isPrimitive(value: unknown): value is bigint | boolean | number | string | null | undefined
{
	if (value === null)
	{
		return true;
	}

	if (["object", "function", "symbol"].includes(typeof value))
	{
		return false;
	}

	return true;
}

export { isPrimitive };
