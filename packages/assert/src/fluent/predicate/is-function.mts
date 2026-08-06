function isFunction(value: unknown): value is (...args: Array<unknown>) => unknown
{
	return typeof value === "function";
}

export { isFunction };
