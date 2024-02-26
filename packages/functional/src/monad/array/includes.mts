function includes<A>(value: ReadonlyArray<A>): (item: unknown) => item is A
{
	return (item: unknown): item is A =>
	{
		// @ts-expect-error: TypeScript is wrong
		return value.includes(item);
	};
}

export { includes };
