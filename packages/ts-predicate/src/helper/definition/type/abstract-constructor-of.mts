type AbstractConstructorOf<T extends object, A extends Array<unknown> = Array<never>> = abstract new (...args: A) => T;

export type { AbstractConstructorOf };
