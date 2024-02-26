function readonly<A>(value: Array<A>): ReadonlyArray<A>
{
	return value.slice();
}

export { readonly };
