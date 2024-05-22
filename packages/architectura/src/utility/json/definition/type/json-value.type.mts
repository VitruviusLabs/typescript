/**
 * JSON value type
 *
 * @remarks
 * Parsing JSON will always result in these types.
 */
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
