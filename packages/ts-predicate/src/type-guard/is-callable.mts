import type { Callable } from "../helper/definition/type/callable.mjs";

function isCallable<Type extends Callable = Callable>(value: unknown): value is Type
{
	return typeof value === "function";
}

export { isCallable };
