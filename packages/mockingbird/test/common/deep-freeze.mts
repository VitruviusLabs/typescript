function deepFreeze(value: unknown): void
{
	if (typeof value !== "object" || value === null)
	{
		return;
	}

	Object.freeze(value);

	Object.values(value).forEach(
		(item: unknown): void =>
		{
			if (typeof item === "object" && item !== null)
			{
				deepFreeze(item);
			}
		}
	);
}

export { deepFreeze };
