type ConstructorOf<T extends object, A extends Array<unknown> = Array<never>> = new (...args: A) => T;

export type { ConstructorOf };
