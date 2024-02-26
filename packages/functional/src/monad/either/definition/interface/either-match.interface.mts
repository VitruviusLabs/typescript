interface EitherMatchInterface<A, B, C, D>
{
	ifLeft: (content: A) => C;
	ifRight: (content: B) => D;
}

export type { EitherMatchInterface };
