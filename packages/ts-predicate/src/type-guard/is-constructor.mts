import type { AbstractConstructorOf } from "../helper/definition/type/abstract-constructor-of.mjs";

function isConstructor<Type extends AbstractConstructorOf<object>>(value: unknown): value is Type
{
	return typeof value === "function" && value.prototype !== undefined;
}

export { isConstructor };
