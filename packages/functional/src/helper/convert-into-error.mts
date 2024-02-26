function convertIntoError(value: unknown): Error
{
	if (value instanceof Error)
	{
		return value;
	}

	if (typeof value === "string")
	{
		return new Error(value);
	}

	return new Error("Unknown error");
}

export { convertIntoError };
