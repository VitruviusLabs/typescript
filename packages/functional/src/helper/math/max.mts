function max(upper_bound: number): (value: number) => number
{
	return (value: number): number =>
	{
		return Math.max(upper_bound, value);
	};
}

export { max };
