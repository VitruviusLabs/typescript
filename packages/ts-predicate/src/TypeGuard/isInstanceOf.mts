import type { ConstructorOf } from "../Helper/_index.mjs";

function isInstanceOf<T extends object>(value: unknown, constructor_class: ConstructorOf<T>): value is InstanceType<typeof constructor_class>
{
    return value instanceof constructor_class;
}

export { isInstanceOf };
