import type { NormalizedError } from "../definition/_index.mjs";
import { ValidationError } from "../type-assertion/utils/validation-error.mjs";
import { toError } from "./to-error.mjs";

function normalizeErrorTree(error: Error): NormalizedError
{
	const ERROR: NormalizedError = {
		message: error.message === "" ? "An unknown error occurred." : error.message,
		// eslint-disable-next-line @ts/no-use-before-define -- Circularity
		causes: getCauses(error),
	};

	return ERROR;
}

function getCauses(error: Error): Array<NormalizedError>
{
	if (error instanceof AggregateError || error instanceof ValidationError)
	{
		return error.errors.map(
			(cause: unknown): NormalizedError =>
			{
				return normalizeErrorTree(toError(cause));
			}
		);
	}

	if (error.cause !== undefined)
	{
		return [normalizeErrorTree(toError(error.cause))];
	}

	return [];
}

export { normalizeErrorTree };
