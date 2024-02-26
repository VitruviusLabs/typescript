import type { ResultType } from "./definition/type/result.type.mjs";
import { isFailure } from "./is-failure.mjs";
import { success } from "./success.mjs";

function map<A, B>(callable: (content: A) => B): (value: ResultType<A>) => ResultType<B>
{
	return (value: ResultType<A>): ResultType<B> =>
	{
		if (isFailure(value))
		{
			return value;
		}

		return success(callable(value.content));
	};
}

export { map };
