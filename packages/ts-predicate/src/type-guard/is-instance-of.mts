import type { AbstractConstructorOf } from "../helper/definition/type/abstract-constructor-of.mjs";

function isInstanceOf<T extends object>(value: unknown, constructor_class: AbstractConstructorOf<T>): value is InstanceType<typeof constructor_class>
{
	return value instanceof constructor_class;
}

export { isInstanceOf };
