// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/array-type -- We need the constructor type
type ConstructorOf<T extends object> = new(...args: any[]) => T;

export type { ConstructorOf };
