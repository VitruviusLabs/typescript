import type { EitherType } from "./definition/type/either.type.mjs";
import type { EitherMatchInterface } from "./definition/interface/either-match.interface.mjs";
import { isLeft } from "./is-left.mjs";
import { left } from "./left.mjs";
import { right } from "./right.mjs";

function match<A, B, C, D>({ ifLeft, ifRight }: EitherMatchInterface<A, B, C, D>): (value: EitherType<A, B>) => EitherType<C, D>
{
	return (value: EitherType<A, B>): EitherType<C, D> =>
	{
		if (isLeft(value))
		{
			return left(ifLeft(value.left));
		}

		return right(ifRight(value.right));
	};
}

export { match };
