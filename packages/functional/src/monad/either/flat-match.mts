import type { EitherMatchInterface } from "./definition/interface/either-match.interface.mjs";
import type { EitherType } from "./definition/type/either.type.mjs";
import { isLeft } from "./is-left.mjs";

function flatMatch<A, B, C>({ ifLeft, ifRight }: EitherMatchInterface<A, B, C, C>): (value: EitherType<A, B>) => C
{
	return (value: EitherType<A, B>): C =>
	{
		if (isLeft(value))
		{
			return ifLeft(value.left);
		}

		return ifRight(value.right);
	};
}

export { flatMatch };
