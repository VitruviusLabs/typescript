function filter<A>(callable: (item: unknown) => item is A): (value: ReadonlyArray<unknown>) => ReadonlyArray<A>;
function filter(callable: (item: unknown) => boolean): (value: ReadonlyArray<unknown>) => ReadonlyArray<unknown>;

function filter(callable: (item: unknown) => boolean): (value: ReadonlyArray<unknown>) => ReadonlyArray<unknown>
{
	return (value: ReadonlyArray<unknown>): ReadonlyArray<unknown> =>
	{
		return value.filter(callable);
	};
}

export { filter };
