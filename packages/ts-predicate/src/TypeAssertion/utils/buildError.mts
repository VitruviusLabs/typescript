function buildError(error: unknown): Error
{
	if (error instanceof Error)
	{
		return error;
	}

	if (typeof error === "string" && error !== "")
	{
		return new Error(error);
	}

	return new Error("An unknown error occurred.");
}

export { buildError };
