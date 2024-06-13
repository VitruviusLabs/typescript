function getName(value: unknown): string | undefined
{
	if (typeof value === "function")
	{
		return value.name;
	}

	if (typeof value === "object" && value !== null)
	{
		// eslint-disable-next-line @typescript/no-unsafe-assignment -- Prototype is loosely typed
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
