import type { Fn } from "./definition/type/fn.type.mjs";

/* eslint-disable @ts/max-params,@style/comma-spacing -- Help with typing properly the sequence */
function pipe<A,B,Z>(f1: Fn<A, B>, f2: Fn<B,Z>): (value: A) => Z;
function pipe<A,B,C,Z>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C,Z>): (value: A) => Z;
function pipe<A,B,C,D,Z>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D,Z>): (value: A) => Z;
function pipe<A,B,C,D,E,Z>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E,Z>): (value: A) => Z;
function pipe<A,B,C,D,E,F,Z>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E, F>, f6: Fn<F,Z>): (value: A) => Z;
function pipe<A,B,C,D,E,F,G,Z>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E, F>, f6: Fn<F, G>, f7: Fn<G,Z>): (value: A) => Z;
function pipe<A,B,C,D,E,F,G,H,Z>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E, F>, f6: Fn<F, G>, f7: Fn<G, H>, f8: Fn<H,Z>): (value: A) => Z;
function pipe<A,B,C,D,E,F,G,H,I,Z>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E, F>, f6: Fn<F, G>, f7: Fn<G, H>, f8: Fn<H, I>, f9: Fn<I,Z>): (value: A) => Z;
function pipe<A,B,C,D,E,F,G,H,I,J,Z>(f1: Fn<A, B>, f2: Fn<B, C>, f3: Fn<C, D>, f4: Fn<D, E>, f5: Fn<E, F>, f6: Fn<F, G>, f7: Fn<G, H>, f8: Fn<H, I>, f9: Fn<I, J>, f10: Fn<J,Z>): (value: A) => Z;
/* eslint-enable @ts/max-params,@style/comma-spacing */

function pipe<A, Z>(...callables: ReadonlyArray<(item: unknown) => unknown>): (value: A) => Z
{
	return (value: A): Z =>
	{
		// @ts-expect-error: cannot handle type transition
		return callables.reduce<Z>(
			// @ts-expect-error: cannot handle type transition
			(intermediate_value: A, callable: (item: A) => Z): Z =>
			{
				return callable(intermediate_value);
			},
			value
		);
	};
}

export { pipe };
