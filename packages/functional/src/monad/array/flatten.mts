function flatten<A>(value: ReadonlyArray<ReadonlyArray<A>>): ReadonlyArray<A>
{
	return value.flat();
}

export { flatten };
