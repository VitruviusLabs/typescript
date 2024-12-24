import { CauseError } from "./cause-error.mjs";

function wrapCause(error: unknown): Error
{
	if (error instanceof Error)
	{
		return error;
	}

	return new CauseError("An unknown error occurred.", error);
}

export { wrapCause };
