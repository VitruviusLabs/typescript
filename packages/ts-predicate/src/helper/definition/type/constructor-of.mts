// eslint-disable-next-line @ts/no-explicit-any,@ts/array-type -- Constructors are complicated to type
type ConstructorOf<T extends object> = new (...args: any[]) => T;

export type { ConstructorOf };
