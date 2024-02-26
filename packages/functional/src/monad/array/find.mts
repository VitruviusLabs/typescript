import { type OptionalType, nothing, something } from "../optional/_index.mjs";

function find<A, B extends A>(callable: (item: A) => item is B): (value: ReadonlyArray<A>) => OptionalType<B>
{
	return (value: ReadonlyArray<A>): OptionalType<B> =>
	{
		const MATCH: B | undefined = value.find(callable);

		if (MATCH === undefined)
		{
			return nothing();
		}

		return something(MATCH);
	};
}

export { find };
