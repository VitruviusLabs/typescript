import type { ResultType } from "./definition/type/result.type.mjs";
import { isFailure } from "./is-failure.mjs";

function flatten<A>(value: ResultType<ResultType<A>>): ResultType<A>
{
	if (isFailure(value))
	{
		return value;
	}

	return value.content;
}

export { flatten };
