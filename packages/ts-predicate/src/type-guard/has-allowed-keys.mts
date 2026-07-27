function hasAllowedKeys(value: object, allowed_keys: ReadonlyArray<string>): boolean
{
	return Object.keys(value).every(
		(key: string): boolean =>
		{
			return allowed_keys.includes(key);
		}
	);
}

export { hasAllowedKeys };
