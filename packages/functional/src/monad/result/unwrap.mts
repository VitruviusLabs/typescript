import type { ResultType } from "./definition/type/result.type.mjs";
import { isFailure } from "./is-failure.mjs";

function unwrap(value: ResultType<Error>): Error
{
	if (isFailure(value))
	{
		return value.error;
	}

	return value.content;
}

export { unwrap };
