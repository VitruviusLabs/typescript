function some<A>(callable: (item: A) => boolean): (value: ReadonlyArray<A>) => boolean
{
	return (value: ReadonlyArray<A>): boolean =>
	{
		return value.some(callable);
	};
}

export { some };
