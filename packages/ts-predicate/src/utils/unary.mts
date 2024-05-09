function unary<T, P extends Array<unknown>, C extends (value: unknown, ...params: P) => value is T>(test: C, ...parameters: P): (value: unknown) => value is T;
function unary<T, P extends Array<unknown>, C extends (value: unknown, ...params: P) => asserts value is T>(test: C, ...parameters: P): (value: unknown) => asserts value is T;

function unary(test: ((...args: Array<unknown>) => boolean), ...parameters: Array<unknown>): (value: unknown) => boolean
{
	return (value: unknown): boolean =>
	{
		return test(value, ...parameters);
	};
}

export { unary };
