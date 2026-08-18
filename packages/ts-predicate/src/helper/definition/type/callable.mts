type Callable<TArgs extends Array<unknown> = Array<never>, TReturn = unknown> = (...args: TArgs) => TReturn;

export type { Callable };
