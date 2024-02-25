type AnythingBut<T> =
	| (T extends bigint ? never : bigint)
	| (T extends boolean ? never : boolean)
	| (T extends number ? never : number)
	| (T extends object ? never : object)
	| (T extends string ? never : string)
	| (T extends symbol ? never : symbol)
;

export type { AnythingBut };
