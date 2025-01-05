// eslint-disable-next-line @ts/no-explicit-any,@ts/array-type -- Constructors are complicated to type
type AbstractConstructorOf<T extends object> = abstract new (...args: any[]) => T;

export type { AbstractConstructorOf };
