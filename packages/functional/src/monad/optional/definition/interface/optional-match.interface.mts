interface OptionalMatchInterface<A, B, C>
{
	ifNothing: () => B;
	ifSomething: (content: A) => C;
}

export type { OptionalMatchInterface };
