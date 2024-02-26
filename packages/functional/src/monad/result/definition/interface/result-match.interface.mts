interface ResultMatchInterface<A, B, C>
{
	ifFailure: (error: Error) => B;
	ifSuccess: (content: A) => C;
}

export type { ResultMatchInterface };
