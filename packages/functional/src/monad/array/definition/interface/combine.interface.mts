interface CombineInterface<A>
{
	callable: (aggregation: A, item: A) => A;
}

export type { CombineInterface };
