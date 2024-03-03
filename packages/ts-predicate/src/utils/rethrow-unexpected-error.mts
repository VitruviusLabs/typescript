import { ValidationError } from "../type-assertion/utils/validation-error.mjs";
import { toError } from "../helper/to-error.mjs";

function rethrowUnexpectedError(error: unknown): asserts error is ValidationError
{
	if (!(error instanceof ValidationError))
	{
		throw toError(error);
	}
}

export { rethrowUnexpectedError };
