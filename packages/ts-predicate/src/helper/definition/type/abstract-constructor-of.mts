// eslint-disable-next-line @ts/no-explicit-any,@ts/array-type -- Constructors are complicated to type
type AbstractConstructorOf<T extends object> = (new (...args: any[]) => T) | (abstract new (...args: any) => any) ;

export type { AbstractConstructorOf };
