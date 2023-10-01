type TypeNameType<A> = A extends boolean
	? "boolean"
	: A extends number
		? "number"
		: A extends string
			? "string"
			: never;

export type { TypeNameType };
