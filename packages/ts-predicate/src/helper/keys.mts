function keys<T extends object>(value: T): Array<keyof T>
{
	// @ts-expect-error: Presume no extraneous keys
	return Object.keys(value);
}

export { keys };
