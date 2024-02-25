import { BaseType, GroupType } from "../definition/_index.mjs";

function expandTypes(types: ReadonlyArray<GroupType>): Array<BaseType>
{
	const TYPES: Set<BaseType> = new Set();

	function addTypes(...values: ReadonlyArray<BaseType>): void
	{
		values.forEach(
			(value: BaseType): void =>
			{
				TYPES.add(value);
			}
		);
	}

	for (const TYPE of types)
	{
		switch (TYPE)
		{
			case GroupType.PRIMITIVE:
				addTypes(
					BaseType.NULLISH,
					BaseType.BOOLEAN,
					BaseType.INTEGER,
					BaseType.REAL,
					BaseType.INFINITY,
					BaseType.BIG_INT,
					BaseType.STRING
				);

				break;

			case GroupType.NUMBER:
				addTypes(BaseType.INTEGER, BaseType.REAL, BaseType.INFINITY);
				break;

			case GroupType.FINITE:
				addTypes(BaseType.INTEGER, BaseType.REAL);
				break;

			case GroupType.OBJECT:
				addTypes(BaseType.RECORD, BaseType.INSTANTIATED);
				break;

			case GroupType.ARRAY_OBJECT:
				addTypes(BaseType.ARRAY, BaseType.RECORD, BaseType.INSTANTIATED);
				break;

			case GroupType.FUNCTION_CLASS:
				addTypes(BaseType.CALLABLE, BaseType.CONSTRUCTIBLE);
				break;

			default:
				// @ts-expect-error: remaining cases are BaseType
				addTypes(TYPE);
		}
	}

	return [...TYPES.values()];
}

export { expandTypes };
