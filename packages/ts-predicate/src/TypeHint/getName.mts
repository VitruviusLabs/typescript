function getName(value: unknown): string | undefined
{
	if (typeof value === "function")
	{
		return value.name;
	}
	else if (typeof value === "object" && value !== null)
	{
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Prototype is loosely typed
		const PROTO: object | null = Object.getPrototypeOf(value);

		if (PROTO === null)
		{
			return "";
		}

		return PROTO.constructor.name;
	}

	return undefined;
}

export { getName };
