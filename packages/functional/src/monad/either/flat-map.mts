import type { EitherType } from "./definition/type/either.type.mjs";
import { isLeft } from "./is-left.mjs";

function flatMap<A, B, C>(callable: (content: B) => EitherType<A, C>): (value: EitherType<A, B>) => EitherType<A, C>
{
	return (value: EitherType<A, B>): EitherType<A, C> =>
	{
		if (isLeft(value))
		{
			return value;
		}

		return callable(value.right);
	};
}

export { flatMap };
