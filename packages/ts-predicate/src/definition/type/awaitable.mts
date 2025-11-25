/**
 * Can be used when defining callables and abstract methods to avoid the obligation to make them asynchronous.
*/
type Awaitable<T> = T | Promise<T>;

export type { Awaitable };
