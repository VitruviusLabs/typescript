import { UnknownError } from "./utils/unknown-error.mjs";

function toError(error: unknown): Error
{
	if (error instanceof Error)
	{
		return error;
	}

	return new UnknownError("An unknown error occurred.", error);
}

export { toError };
