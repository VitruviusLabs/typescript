type NonNullableObject<T extends object> = {
	[K in keyof T]: NonNullable<T[K]>;
};

export type { NonNullableObject };
