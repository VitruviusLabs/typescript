function min(lower_bound: number): (value: number) => number
{
	return (value: number): number =>
	{
		return Math.min(lower_bound, value);
	};
}

export { min };
