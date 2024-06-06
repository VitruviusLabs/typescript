/**
 * Turn an object into a null-prototype copy.
 *
 * @remarks
 * Helps with unit tests involving null-prototype objects.
 */
function nullPrototype<T extends object>(value: T): T
{
	const COPY: T = structuredClone(value);

	Object.setPrototypeOf(COPY, null);

	return COPY;
}

export { nullPrototype };
