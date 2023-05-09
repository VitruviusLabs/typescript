// eslint-disable-next-line @typescript-eslint/ban-types -- Allow proper function inference
function isCallable(value: unknown): value is Function
{
	return typeof value === "function" && value.prototype === undefined;
}

export { isCallable };
