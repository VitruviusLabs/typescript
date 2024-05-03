import type { Test } from "../definition/type/test.mjs";
import { itemGuard } from "./utils/item-guard.mjs";

function isUnion<T1, T2>(value: unknown, tests: [Test<T1>, Test<T2>]): value is T1 | T2;
function isUnion<T1, T2, T3>(value: unknown, tests: [Test<T1>, Test<T2>, Test<T3>]): value is T1 | T2 | T3;
function isUnion<T1, T2, T3, T4>(value: unknown, tests: [Test<T1>, Test<T2>, Test<T3>, Test<T4>]): value is T1 | T2 | T3 | T4;
function isUnion<T1, T2, T3, T4, T5>(value: unknown, tests: [Test<T1>, Test<T2>, Test<T3>, Test<T4>, Test<T5>]): value is T1 | T2 | T3 | T4 | T5;

function isUnion(value: unknown, tests: Array<Test<unknown>>): value is unknown
{
	return tests.some(
		(test: Test<unknown>): boolean =>
		{
			return itemGuard(value, test);
		}
	);
}

export { isUnion };
