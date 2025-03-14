import type { AbstractConstructorOf } from "./definition/type/abstract-constructor-of.mjs";
import type { ConstructorOf } from "./definition/type/constructor-of.mjs";

function getConstructorOf<T extends object, C extends AbstractConstructorOf<T> = ConstructorOf<T>>(value: T): C
{
	// eslint-disable-next-line @ts/no-unsafe-assignment -- Object.getPrototypeOf is badly typed
	const PROTOTYPE: object | null = Object.getPrototypeOf(value);

	if (PROTOTYPE === null)
	{
		throw new Error("The value has no prototype.");
	}

	// eslint-disable-next-line @ts/no-unnecessary-condition -- Object.create can make constructor-less objects
	if (PROTOTYPE.constructor === undefined)
	{
		throw new Error("The value has no constructor.");
	}

	// @ts-expect-error -- Prototype constructor is badly typed
	return PROTOTYPE.constructor;
}

export { getConstructorOf };
