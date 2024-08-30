// eslint-disable-next-line @ts/no-unsafe-function-type -- Allow proper function inference
function isFunction(value: unknown): value is Function
{
	return typeof value === "function";
}

export { isFunction };
