interface ReduceInterface<A, B>
{
	callable: (aggregation: B, item: A) => B;
	initialValue: B;
}

export type { ReduceInterface };
