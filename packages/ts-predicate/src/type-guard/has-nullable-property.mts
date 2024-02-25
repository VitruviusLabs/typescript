import type { ObjectWithNullableProperty } from "../definition/_index.mjs";

function hasNullableProperty<O extends object, K extends string>(
	value: O,
	property: K
): value is ObjectWithNullableProperty<O, K>
{
	return property in value;
}

export { hasNullableProperty };
