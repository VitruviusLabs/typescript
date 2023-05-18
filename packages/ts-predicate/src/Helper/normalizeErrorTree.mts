import { buildError } from "../TypeAssertion/utils/buildError.mjs";

import type { NormalizedError } from "../Types/NormalizedError.mjs";

function normalizeErrorTree(error: Error): NormalizedError
{
	const ERROR: NormalizedError = {
		message: error.message === "" ? "An unknown error occurred." : error.message,
		// eslint-disable-next-line @typescript-eslint/no-use-before-define -- Circularity
		causes: getCauses(error),
	};

	return ERROR;
}

function getCauses(error: Error): Array<NormalizedError>
{
	if (error instanceof AggregateError)
	{
		return error.errors.map(
			(cause: unknown): NormalizedError =>
			{
				return normalizeErrorTree(buildError(cause));
			}
		);
	}

	if (error.cause !== undefined)
	{
		return [normalizeErrorTree(buildError(error.cause))];
	}

	return [];
}

export { normalizeErrorTree };
