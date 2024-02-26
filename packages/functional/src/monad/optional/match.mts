import { type EitherType, left, right } from "../either/_index.mjs";
import type { OptionalMatchInterface } from "./definition/interface/optional-match.interface.mjs";
import type { OptionalType } from "./definition/type/optional.type.mjs";
import { isNothing } from "./is-nothing.mjs";

function match<A, B, C>({ ifNothing, ifSomething }: OptionalMatchInterface<A, B, C>): (value: OptionalType<A>) => EitherType<B, C>
{
	return (value: OptionalType<A>): EitherType<B, C> =>
	{
		if (isNothing(value))
		{
			return left(ifNothing());
		}

		return right(ifSomething(value.content));
	};
}

export { match };
