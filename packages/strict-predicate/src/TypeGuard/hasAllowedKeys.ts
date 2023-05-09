function hasAllowedKeys(value: Record<string, unknown>, allowed_keys: Array<string>): boolean
{
	return Object.keys(value).every(
		(key: string): boolean =>
		{
			return allowed_keys.includes(key);
		}
	);
}

export { hasAllowedKeys };
