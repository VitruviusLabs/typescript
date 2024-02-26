import { type OptionalType, nothing, something } from "../optional/_index.mjs";

function pick(index: number): <A>(value: ReadonlyArray<A>) => OptionalType<A>
{
	// eslint-disable-next-line @stylistic/ts/comma-dangle -- Needed by TypeScript
	return <A,>(value: ReadonlyArray<A>): OptionalType<A> =>
	{
		const ITEM: A | undefined = value.at(index);

		if (ITEM === undefined)
		{
			return nothing();
		}

		return something(ITEM);
	};
}

export { pick };
