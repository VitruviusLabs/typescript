function wrapTest<T, P extends Array<unknown>, C extends (value: unknown, ...params: P) => value is T>(test: C, ...parameters: P): (value: unknown) => value is T;
function wrapTest<T, P extends Array<unknown>, C extends (value: unknown, ...params: P) => asserts value is T>(test: C, ...parameters: P): (value: unknown) => asserts value is T;

function wrapTest(test: ((...args: Array<unknown>) => boolean), ...parameters: Array<unknown>): (value: unknown) => boolean
{
	return (value: unknown): boolean =>
	{
		return test(value, ...parameters);
	};
}

export { wrapTest };
