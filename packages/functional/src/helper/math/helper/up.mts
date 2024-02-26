function up(value: number, coefficient: number): number
{
	return Math.ceil(value / coefficient) * coefficient;
}

export { up };
