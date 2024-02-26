function mutable<A>(value: ReadonlyArray<A>): Array<A>
{
	return value.slice();
}

export { mutable };
