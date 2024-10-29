// eslint-disable-next-line @ts/consistent-indexed-object-style -- Such signature cannot be expressed as a record
type ObjectWithNullableProperty<O extends object, K extends string | symbol> = O & {
	[property in K]: K extends keyof O ? O[K] : unknown;
};

export type { ObjectWithNullableProperty };
