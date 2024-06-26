/**
 * Splits a string into two parts at the first occurrence of a separator.
 *
 * @remarks
 * - If the separator is not found, the second part is an empty string.
 * - The separator is excluded from the parts.
 * - The separator can be any length.
 */
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
