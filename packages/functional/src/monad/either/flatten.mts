import type { EitherType } from "./definition/type/either.type.mjs";
import { isLeft } from "./is-left.mjs";

function flatten<A, B>(value: EitherType<A, EitherType<A, B>>): EitherType<A, B>
{
	if (isLeft(value))
	{
		return value;
	}

	return value.right;
}

export { flatten };
