import type { Nullable } from "../index.mjs";

function createCopiesWithNullishProperty<Type extends object>(valid_object: Type): Array<Nullable<Type>>
{
	return Object.keys(valid_object).map(
		// @ts-expect-error: Key mapping
		(key: keyof Type): Nullable<Type> =>
		{
			const COPY: Nullable<Type> = { ...valid_object };

			COPY[key] = undefined;

			return COPY;
		}
	);
}

export { createCopiesWithNullishProperty };
