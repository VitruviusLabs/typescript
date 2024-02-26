function map<A, B>(callable: (item: A) => B): (value: ReadonlyArray<A>) => ReadonlyArray<B>
{
	return (value: ReadonlyArray<A>): ReadonlyArray<B> =>
	{
		return value.map(callable);
	};
}

export { map };
