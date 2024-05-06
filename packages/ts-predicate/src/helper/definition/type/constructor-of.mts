// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/array-type -- Constructors are complicated to type
type ConstructorOf<T extends object> = new (...args: any[]) => T;

export type { ConstructorOf };
