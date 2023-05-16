function buildCause(error: unknown): ErrorOptions | undefined
{
	if (error instanceof Error)
	{
		return { cause: error };
	}

	return undefined;
}

export { buildCause };
