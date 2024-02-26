function copyWithin<A>({ target, start, end }: { target: number; start?: number; end?: number }): (value: ReadonlyArray<A>) => ReadonlyArray<A>
{
	return (value: ReadonlyArray<A>): ReadonlyArray<A> =>
	{
		return value.slice().copyWithin(target, start ?? 0, end ?? value.length);
	};
}

export { copyWithin };
