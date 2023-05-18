function isPrimitive(value: unknown): asserts value is boolean | number | string | null | undefined
{
	if (value === null)
	{
		return;
	}

	if (typeof value === "object" || typeof value === "function" || typeof value === "symbol")
	{
		throw new Error("The value must be a primitive type.");
	}
}

export { isPrimitive };
