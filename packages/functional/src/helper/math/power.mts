function power(exponent: number): (base: number) => number
{
	return (base: number): number =>
	{
		return Math.pow(base, exponent);
	};
}

export { power };
