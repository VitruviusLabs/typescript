// eslint-disable-next-line @typescript/no-explicit-any,@typescript/array-type -- Constructors are complicated to type
type ConstructorOf<T extends object> = new (...args: any[]) => T;

export type { ConstructorOf };
