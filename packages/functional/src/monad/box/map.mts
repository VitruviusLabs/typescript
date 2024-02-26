import { box } from "./box.mjs";
import type { BoxInterface } from "./definition/interface/box.interface.mjs";

function map<A, B>(callable: (content: A) => B): (value: BoxInterface<A>) => BoxInterface<B>
{
	return (value: BoxInterface<A>): BoxInterface<B> =>
	{
		return box(callable(value.content));
	};
}

export { map };
