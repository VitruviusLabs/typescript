function flatMap<A, B>(callable: (item: A) => ReadonlyArray<B>): (value: ReadonlyArray<A>) => ReadonlyArray<B>
{
	return (value: ReadonlyArray<A>): ReadonlyArray<B> =>
	{
		return value.flatMap(callable);
	};
}

export { flatMap };
