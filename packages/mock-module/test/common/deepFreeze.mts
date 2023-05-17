function deepFreeze(value: unknown): void
{
	if (typeof value !== "object" || value === null)
	{
		return;
	}

	Object.freeze(value);

	Object.keys(value).forEach(
		(key: string): void =>
		{
			// @ts-expect-error: key mapping
			const VALUE: unknown = value[key];

			if (typeof VALUE === "object" && VALUE !== null)
			{
				deepFreeze(VALUE);
			}
		}
	);
}

export { deepFreeze };
