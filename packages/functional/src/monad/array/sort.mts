function sort<A>(callable: (a: A, z: A) => number): (value: ReadonlyArray<A>) => ReadonlyArray<A>
{
	return (value: ReadonlyArray<A>): ReadonlyArray<A> =>
	{
		return value.toSorted(callable);
	};
}

export { sort };
