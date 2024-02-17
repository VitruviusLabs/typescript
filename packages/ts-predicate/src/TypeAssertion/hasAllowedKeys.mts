function hasAllowedKeys(value: Record<string, unknown>, allowed_keys: Array<string>): void
{
	const FORBIDDEN_PROPERTIES: Array<string> = Object.keys(value).filter(
		(key: string): boolean =>
		{
			return !allowed_keys.includes(key);
		}
	);

	if (FORBIDDEN_PROPERTIES.length > 0)
	{
		throw new Error(`The value must not have the properties "${FORBIDDEN_PROPERTIES.join('", "')}".`);
	}
}

export { hasAllowedKeys };
