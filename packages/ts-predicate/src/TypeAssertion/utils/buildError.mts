import { UnknownError } from "./UnknownError.mjs";

function buildError(error: unknown): Error
{
	if (error instanceof Error)
	{
		return error;
	}

	return new UnknownError("An unknown error occurred.", error);
}

export { buildError };
