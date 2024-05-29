function nullPrototype<T extends object>(value: T): T
{
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Loosely typed
	return Object.assign(Object.create(null), value);
}

export { nullPrototype };
