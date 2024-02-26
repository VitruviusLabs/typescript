import type { InsertInterface } from "./definition/interface/insert.interface.mjs";

function insert<A>({ index, value }: InsertInterface<A>): (array: ReadonlyArray<A>) => ReadonlyArray<A>
{
	return (array: ReadonlyArray<A>): ReadonlyArray<A> =>
	{
		return array.with(index, value);
	};
}

export { insert };
