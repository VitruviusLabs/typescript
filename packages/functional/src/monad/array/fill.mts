function fill<B>(item: B): <A>(value: ReadonlyArray<A>) => ReadonlyArray<B>
{
	// eslint-disable-next-line @stylistic/ts/comma-dangle -- Needed by TypeScript
	return <A,>(value: ReadonlyArray<A>): ReadonlyArray<B> =>
	{
		return value.map(
			(): B =>
			{
				return item;
			}
		);
	};
}

export { fill };
