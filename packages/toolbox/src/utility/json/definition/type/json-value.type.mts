type JSONValueType = (
	| Array<JSONValueType>
	| bigint
	| boolean
	| number
	| string
	| { [key: string]: JSONValueType }
	| null
);

export type { JSONValueType };
