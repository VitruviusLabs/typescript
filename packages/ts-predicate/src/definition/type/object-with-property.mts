type ObjectWithProperty<O extends object, K extends string, T> = O & {
	[property in K]: K extends keyof O ? NonNullable<O[K]> : T;
};

export type { ObjectWithProperty };
