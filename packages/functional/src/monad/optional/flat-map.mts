import type { OptionalType } from "./definition/_index.mjs";
import { isNothing } from "./is-nothing.mjs";

function flatMap<A, B>(callable: (content: A) => OptionalType<B>): (value: OptionalType<A>) => OptionalType<B>
{
	return (value: OptionalType<A>): OptionalType<B> =>
	{
		if (isNothing(value))
		{
			return value;
		}

		return callable(value.content);
	};
}

export { flatMap };
