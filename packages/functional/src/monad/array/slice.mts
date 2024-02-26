import type { BoundaryInterface } from "./definition/interface/boundary.interface.mjs";

function slice<A>({ start, end }: BoundaryInterface): (value: ReadonlyArray<A>) => ReadonlyArray<A>
{
	return (value: ReadonlyArray<A>): ReadonlyArray<A> =>
	{
		return value.slice(start ?? 0, end ?? value.length);
	};
}

export { slice };
