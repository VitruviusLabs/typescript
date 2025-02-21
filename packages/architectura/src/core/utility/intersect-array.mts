function intersectArrays<T extends string | number | boolean>(...arrays: [Array<T>, Array<T>, ...Array<Array<T>>]): Array<T>
{
	const [first, ...rest]: [Array<T>, Array<T>, ...Array<Array<T>>] = arrays;

	const result: Array<T> = [];

	for (const element of first)
	{
		let included: boolean = true;

		for (const array of rest)
		{
			if (!array.includes(element))
			{
				included = false;

				break;
			}
		}

		if (included)
		{
			result.push(element);
		}
	}

	return result;
}

export { intersectArrays };
