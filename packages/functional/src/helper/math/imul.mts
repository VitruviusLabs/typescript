function imul(a: number): (b: number) => number
{
	return (b: number): number =>
	{
		return Math.imul(a, b);
	};
}

export { imul };
