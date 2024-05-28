function splitOnce(separator: string, value: string): [string, string]
{
	const SEPARATOR_INDEX: number = value.indexOf(separator);

	if (SEPARATOR_INDEX === -1)
	{
		return [value, ""];
	}

	return [
		value.slice(0, SEPARATOR_INDEX),
		value.slice(SEPARATOR_INDEX + separator.length),
	];
}

export { splitOnce };
