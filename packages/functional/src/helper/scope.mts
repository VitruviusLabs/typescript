function scope<A>(value: A): <B>(callable: (item: A) => B) => B
{
	// eslint-disable-next-line @stylistic/ts/comma-dangle -- Needed by TypeScript
	return <B,>(callable: (item: A) => B): B =>
	{
		return callable(value);
	};
}

export { scope };
