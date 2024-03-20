type JSONValueType = (
	| Array<JSONValueType>
	| boolean
	| number
	| string
	| { [key: string]: JSONValueType }
	| null
);

export type { JSONValueType };
