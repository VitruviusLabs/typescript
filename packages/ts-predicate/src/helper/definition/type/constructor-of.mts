type ConstructorOf<T extends object, TArgs extends Array<unknown> = Array<never>> = new (...args: TArgs) => T;

export type { ConstructorOf };
