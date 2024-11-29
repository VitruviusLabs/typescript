type OptionalKeys<T extends object, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export type { OptionalKeys };
