/* eslint-disable */
function createCopiesWithMissingProperty<Type extends object>(valid_object: Required<Type>): Array<Partial<Type>>
{
	return Object.keys(valid_object).map(
		// @ts-expect-error: Key mapping
		(key: keyof Type): Partial<Type> =>
		{
			const COPY: Partial<Type> = { ...valid_object };

			delete COPY[key];

			return COPY;
		}
	);
}

export { createCopiesWithMissingProperty };
