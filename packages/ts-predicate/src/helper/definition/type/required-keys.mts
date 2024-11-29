type RequiredKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export type { RequiredKeys };
