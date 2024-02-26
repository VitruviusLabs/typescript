import type { ResultType } from "./definition/type/result.type.mjs";
import { isFailure } from "./is-failure.mjs";

function flatMap<A, B>(callable: (content: A) => ResultType<B>): (value: ResultType<A>) => ResultType<B>
{
	return (value: ResultType<A>): ResultType<B> =>
	{
		if (isFailure(value))
		{
			return value;
		}

		return callable(value.content);
	};
}

export { flatMap };
