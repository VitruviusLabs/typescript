import type { CombineInterface } from "./definition/interface/combine.interface.mjs";
import type { ReduceInterface } from "./definition/interface/reduce.interface.mjs";

// @ts-expect-error: initialValue will just be undefined
function reverseReduce<A>({ callable }: CombineInterface<A>): (value: ReadonlyArray<A>) => A;
function reverseReduce<A, B>({ callable, initialValue }: ReduceInterface<A, B>): (value: ReadonlyArray<A>) => B;

function reverseReduce({ callable, initialValue }: ReduceInterface<unknown, unknown>): unknown
{
	return (value: ReadonlyArray<unknown>): unknown =>
	{
		if (initialValue === undefined)
		{
			return value.reduceRight(callable);
		}

		return value.reduceRight(callable, initialValue);
	};
}

export { reverseReduce };
