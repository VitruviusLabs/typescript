function buildError(error: unknown, key: string): Error
{
	if (error instanceof Error)
	{
		return error;
	}

	if (typeof error === "string")
	{
		return new Error(error);
	}

	return new Error(`An unknown error occurred when validating property "${key}"`);
}

export { buildError };
