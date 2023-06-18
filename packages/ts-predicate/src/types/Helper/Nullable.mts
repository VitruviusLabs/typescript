type Nullable<T> = {
	[K in keyof T]: T[K] | undefined;
};

export type { Nullable };
