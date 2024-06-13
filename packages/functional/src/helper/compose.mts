import type { Fn } from "./definition/type/fn.type.mjs";

/* eslint-disable @stylistic/comma-spacing -- Compact */
function compose<A,B,Z>(f2: Fn<B,Z>, f1: Fn<A, B>): (value: A) => Z;
function compose<A,B,C,Z>(f3: Fn<C,Z>, f2: Fn<B, C>, f1: Fn<A, B>): (value: A) => Z;
function compose<A,B,C,D,Z>(f4: Fn<D,Z>, f3: Fn<B, D>, f2: Fn<B, C>, f1: Fn<A, B>): (value: A) => Z;
function compose<A,B,C,D,E,Z>(f5: Fn<E,Z>, f4: Fn<D, E>, f3: Fn<B, D>, f2: Fn<B, C>, f1: Fn<A, B>): (value: A) => Z;
function compose<A,B,C,D,E,F,Z>(f6: Fn<F,Z>, f5: Fn<E, F>, f4: Fn<D, E>, f3: Fn<B, D>, f2: Fn<B, C>, f1: Fn<A, B>): (value: A) => Z;
function compose<A,B,C,D,E,F,G,Z>(f7: Fn<G,Z>, f6: Fn<F, G>, f5: Fn<E, F>, f4: Fn<D, E>, f3: Fn<B, D>, f2: Fn<B, C>, f1: Fn<A, B>): (value: A) => Z;
function compose<A,B,C,D,E,F,G,H,Z>(f8: Fn<H,Z>, f7: Fn<G, H>, f6: Fn<F, G>, f5: Fn<E, F>, f4: Fn<D, E>, f3: Fn<B, D>, f2: Fn<B, C>, f1: Fn<A, B>): (value: A) => Z;
function compose<A,B,C,D,E,F,G,H,I,Z>(f9: Fn<I,Z>, f8: Fn<H, I>, f7: Fn<G, H>, f6: Fn<F, G>, f5: Fn<E, F>, f4: Fn<D, E>, f3: Fn<B, D>, f2: Fn<B, C>, f1: Fn<A, B>): (value: A) => Z;
function compose<A,B,C,D,E,F,G,H,I,J,Z>(f10: Fn<J,Z>, f9: Fn<I,J>, f8: Fn<H, I>, f7: Fn<G, H>, f6: Fn<F, G>, f5: Fn<E, F>, f4: Fn<D, E>, f3: Fn<B, D>, f2: Fn<B, C>, f1: Fn<A, B>): (value: A) => Z;
/* eslint-enable @stylistic/comma-spacing -- Compact */

function compose<A, Z>(...callables: ReadonlyArray<(item: unknown) => unknown>): (value: A) => Z
{
	return (value: A): Z =>
	{
		// @ts-expect-error: cannot handle type transition
		return callables.reduceRight<Z>(
			// @ts-expect-error: cannot handle type transition
			(intermediate_value: A, callable: (item: A) => Z): Z =>
			{
				return callable(intermediate_value);
			},
			value
		);
	};
}

export { compose };
