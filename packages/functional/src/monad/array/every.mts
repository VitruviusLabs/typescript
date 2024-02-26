function every(callable: (item: unknown) => boolean): (value: ReadonlyArray<unknown>) => boolean
{
	return (value: ReadonlyArray<unknown>): boolean =>
	{
		return value.every(callable);
	};
}

export { every };
