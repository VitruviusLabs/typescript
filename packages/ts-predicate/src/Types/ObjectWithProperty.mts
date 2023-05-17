type ObjectWithProperty<O extends object, K extends string> = O & {
	[property in K]: K extends keyof O ? NonNullable<O[K]> : unknown;
};

export type { ObjectWithProperty };
