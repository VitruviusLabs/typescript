import type { EitherType } from "./definition/type/either.type.mjs";
import { isLeft } from "./is-left.mjs";

function unwrap<A>(value: EitherType<A, A>): A
{
	if (isLeft(value))
	{
		return value.left;
	}

	return value.right;
}

export { unwrap };
