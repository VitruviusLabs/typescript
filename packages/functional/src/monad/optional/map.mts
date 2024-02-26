import type { OptionalType } from "./definition/type/optional.type.mjs";
import { isNothing } from "./is-nothing.mjs";
import { something } from "./something.mjs";

function map<A, B>(callable: (content: A) => B): (value: OptionalType<A>) => OptionalType<B>
{
	return (value: OptionalType<A>): OptionalType<B> =>
	{
		if (isNothing(value))
		{
			return value;
		}

		return something(callable(value.content));
	};
}

export { map };
