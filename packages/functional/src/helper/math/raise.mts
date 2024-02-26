function raise(base: number): (exponent: number) => number
{
	return (exponent: number): number =>
	{
		return Math.pow(base, exponent);
	};
}

export { raise };
