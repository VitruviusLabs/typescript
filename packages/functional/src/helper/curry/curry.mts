import type { CallableType } from "./definition/type/callable.type.mjs";
import { nextCurry } from "./next-curry.mjs";

/* eslint-disable @ts/max-params,@style/comma-spacing,id-denylist -- Help with typing properly the sequence */
function curry<Z>(callable: () => Z): () => Z;
function curry<A,Z>(callable: (a: A) => Z): (a: A) => Z;
function curry<A,B,Z>(callable: (a: A, b: B) => Z): (a: A) => (b: B) => Z;
function curry<A,B,C,Z>(callable: (a: A, b: B, c: C) => Z): (a: A) => (b: B) => (c: C) => Z;
function curry<A,B,C,D,Z>(callable: (a: A, b: B, c: C, d: D) => Z): (a: A) => (b: B) => (c: C) => (d: D) => Z;
function curry<A,B,C,D,E,Z>(callable: (a: A, b: B, c: C, d: D, e: E) => Z): (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => Z;
function curry<A,B,C,D,E,F,Z>(callable: (a: A, b: B, c: C, d: D, e: E, f: F) => Z): (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => Z;
function curry<A,B,C,D,E,F,G,Z>(callable: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => Z): (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => Z;
function curry<A,B,C,D,E,F,G,H,Z>(callable: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => Z): (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => Z;
/* eslint-enable @ts/max-params,@style/comma-spacing,id-denylist */

function curry(callable: CallableType): CallableType
{
	// eslint-disable-next-line @ts/no-magic-numbers -- Optimisation
	if (callable.length < 2)
	{
		return callable;
	}

	return nextCurry(callable, []);
}

export { curry };
