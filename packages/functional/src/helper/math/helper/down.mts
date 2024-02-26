function down(value: number, coefficient: number): number
{
	return Math.floor(value / coefficient) * coefficient;
}

export { down };
