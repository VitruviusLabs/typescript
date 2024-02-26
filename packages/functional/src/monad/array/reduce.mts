import type { CombineInterface } from "./definition/interface/combine.interface.mjs";
import type { ReduceInterface } from "./definition/interface/reduce.interface.mjs";

// @ts-expect-error: initialValue will just be undefined
function reduce<A>({ callable }: CombineInterface<A>): (value: ReadonlyArray<A>) => A;
function reduce<A, B>({ callable, initialValue }: ReduceInterface<A, B>): (value: ReadonlyArray<A>) => B;

function reduce({ callable, initialValue }: ReduceInterface<unknown, unknown>): unknown
{
	return (value: ReadonlyArray<unknown>): unknown =>
	{
		if (initialValue === undefined)
		{
			return value.reduce(callable);
		}

		return value.reduce(callable, initialValue);
	};
}

export { reduce };
