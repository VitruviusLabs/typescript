type ObjectWithNullableProperty<O extends object, K extends string | symbol> = O & {
	[property in K]: K extends keyof O ? O[K] : unknown;
};

export type { ObjectWithNullableProperty };
