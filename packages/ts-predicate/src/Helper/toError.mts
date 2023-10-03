import { UnknownError } from "./utils/UnknownError.mjs";

function toError(error: unknown): Error
{
	if (error instanceof Error)
	{
		return error;
	}

	return new UnknownError("An unknown error occurred.", error);
}

export { toError };
