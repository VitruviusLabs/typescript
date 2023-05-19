
type Test<Type> =
	| ((value: unknown) => asserts value is Type)
	| ((value: unknown) => value is Type)
	;

export type { Test };
