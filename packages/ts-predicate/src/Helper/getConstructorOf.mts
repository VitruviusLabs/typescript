import type { ConstructorOf } from "./_index.mjs";

function getConstructorOf<T extends object, C extends ConstructorOf<T>>(value: T): C
{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Object.getPrototypeOf is badly typed
    const PROTOTYPE: object | null = Object.getPrototypeOf(value);

    if (PROTOTYPE === null)
    {
        throw new Error("The value has no prototype.");
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Object.create can make constructor-less objects
    if (PROTOTYPE.constructor === undefined)
    {
        throw new Error("The value has no constructor.");
    }

    // @ts-expect-error -- Prototype constructor is badly typed
    return PROTOTYPE.constructor;
}

export { getConstructorOf };
