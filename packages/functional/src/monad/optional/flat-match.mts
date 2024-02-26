import type { OptionalMatchInterface } from "./definition/interface/optional-match.interface.mjs";
import type { OptionalType } from "./definition/type/optional.type.mjs";
import { isNothing } from "./is-nothing.mjs";

function flatMatch<A, B>({ ifNothing, ifSomething }: OptionalMatchInterface<A, B, B>): (value: OptionalType<A>) => B
{
	return (value: OptionalType<A>): B =>
	{
		if (isNothing(value))
		{
			return ifNothing();
		}

		return ifSomething(value.content);
	};
}

export { flatMatch };
