// eslint-disable-next-line @ts/consistent-indexed-object-style -- Such signature cannot be expressed as a record
type ObjectWithProperty<O extends object, K extends string | symbol, T> = O & {
	[property in K]: T;
};

export type { ObjectWithProperty };
