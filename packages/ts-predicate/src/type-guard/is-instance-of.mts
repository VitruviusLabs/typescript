import type { ConstructorOf } from "../helper/definition/type/constructor-of.mjs";

function isInstanceOf<T extends object>(value: unknown, constructor_class: ConstructorOf<T>): value is InstanceType<typeof constructor_class>
{
	return value instanceof constructor_class;
}

export { isInstanceOf };
