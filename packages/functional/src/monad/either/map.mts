import type { EitherType } from "./definition/type/either.type.mjs";
import { isLeft } from "./is-left.mjs";
import { right } from "./right.mjs";

function map<A, B, C>(callable: (content: B) => C): (value: EitherType<A, B>) => EitherType<A, C>
{
	return (value: EitherType<A, B>): EitherType<A, C> =>
	{
		if (isLeft(value))
		{
			return value;
		}

		return right(callable(value.right));
	};
}

export { map };
