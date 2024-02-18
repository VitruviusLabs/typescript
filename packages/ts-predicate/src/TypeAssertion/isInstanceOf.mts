import type { ConstructorOf } from "../Helper/_index.mjs";

function isInstanceOf<T extends object>(value: unknown, constructor_class: ConstructorOf<T>): asserts value is InstanceType<typeof constructor_class>
{
    if (!(value instanceof constructor_class))
    {
        throw new Error(`The value is not an instance of ${constructor_class.name}.`);
    }
}

export { isInstanceOf };
