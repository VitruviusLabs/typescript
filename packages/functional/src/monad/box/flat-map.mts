import type { BoxInterface } from "./definition/interface/box.interface.mjs";

function flatMap<A, B>(callable: (content: A) => BoxInterface<B>): (value: BoxInterface<A>) => BoxInterface<B>
{
	return (value: BoxInterface<A>): BoxInterface<B> =>
	{
		return callable(value.content);
	};
}

export { flatMap };
