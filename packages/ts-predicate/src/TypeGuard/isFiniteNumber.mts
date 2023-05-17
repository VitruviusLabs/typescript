function isFiniteNumber(value: unknown): value is number
{
	return Number.isFinite(value);
}

export { isFiniteNumber };
