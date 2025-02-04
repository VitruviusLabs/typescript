type ExtractType<T, K> = K extends keyof T ? T[K] : never;

export type { ExtractType };
