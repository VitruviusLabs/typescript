interface ValidationInterface<A>
{
	readonly content: A;
	readonly errors: ReadonlyArray<Error>;
}

export type { ValidationInterface };
