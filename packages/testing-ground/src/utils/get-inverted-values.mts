/* eslint-disable */
import { BaseType, type GroupType } from "../definition/_index.mjs";
import { expandTypes } from "./expand-types.mjs";
import { getValues } from "./get-values.mjs";

function getInvertedValues(...excluded_types: ReadonlyArray<GroupType>): Array<unknown>
{
	const ALL_TYPES: Array<BaseType> = [
		BaseType.NULLISH,
		BaseType.BOOLEAN,
		BaseType.INTEGER,
		BaseType.REAL,
		BaseType.INFINITY,
		BaseType.BIG_INT,
		BaseType.STRING,
		BaseType.SYMBOL,
		BaseType.ARRAY,
		BaseType.RECORD,
		BaseType.INSTANTIATED,
		BaseType.CALLABLE,
		BaseType.CONSTRUCTIBLE,
	];

	const EXCLUDED_TYPES: Array<BaseType> = expandTypes(excluded_types);

	const INCLUDED_TYPES: Array<BaseType> = ALL_TYPES.filter(
		(type: BaseType): boolean =>
		{
			return !EXCLUDED_TYPES.includes(type);
		}
	);

	// @ts-expect-error: GroupType extends BaseType
	return getValues(...INCLUDED_TYPES);
}

export { getInvertedValues };
