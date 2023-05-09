function isPrimitive(value: unknown): value is boolean | number | string | null | undefined
{
	if (value === null)
	{
		return true;
	}

	if (typeof value === "object" || typeof value === "function" || typeof value === "symbol")
	{
		return false;
	}

	return true;
}

export { isPrimitive };
