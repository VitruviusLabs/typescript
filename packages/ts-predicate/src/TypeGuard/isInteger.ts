function isInteger(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

export { isInteger };
