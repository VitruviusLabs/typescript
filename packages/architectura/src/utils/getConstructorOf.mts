import type { ConstructorOf } from "./ConstructorOf.mjs";

function getConstructorOf<T extends object>(value: T): ConstructorOf<T>
{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return -- Native is badly typed
    return Object.getPrototypeOf(value).constructor;
}

export { getConstructorOf };
