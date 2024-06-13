// eslint-disable-next-line @typescript/ban-types -- Allow proper function inference
function isFunction(value: unknown): value is Function
{
	return typeof value === "function";
}

export { isFunction };
