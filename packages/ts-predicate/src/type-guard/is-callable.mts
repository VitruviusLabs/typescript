// eslint-disable-next-line @ts/no-unsafe-function-type -- Allow proper function inference
function isCallable(value: unknown): value is Function
{
	return typeof value === "function" && value.prototype === undefined;
}

export { isCallable };
