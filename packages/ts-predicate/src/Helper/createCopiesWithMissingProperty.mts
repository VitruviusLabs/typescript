function createCopiesWithMissingProperty<Type extends object>(valid_object: Required<Type>): Array<Partial<Type>>
{
	return Object.keys(valid_object).map(
		// @ts-expect-error: Key mapping
		(key: keyof Type): Partial<Type> =>
		{
			const COPY: Partial<Type> = { ...valid_object };

			/* eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- Needed for testing */
			delete COPY[key];

			return COPY;
		}
	);
}

export { createCopiesWithMissingProperty };
