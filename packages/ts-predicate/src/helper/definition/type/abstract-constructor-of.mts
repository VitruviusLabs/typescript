type AbstractConstructorOf<T extends object, TArgs extends Array<unknown> = Array<never>> = abstract new (...args: TArgs) => T;

export type { AbstractConstructorOf };
