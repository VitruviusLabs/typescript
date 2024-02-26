function join(separator: string): (value: ReadonlyArray<string>) => string
{
	return (value: ReadonlyArray<string>): string =>
	{
		return value.join(separator);
	};
}

export { join };
