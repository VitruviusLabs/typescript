import type { GroupType } from "../definition//_index.mjs";
import { expandTypes } from "./expand-types.mjs";
import { getValuesForType } from "./get-values-for-type.mjs";

function getValues(...included_types: ReadonlyArray<GroupType>): Array<unknown>
{
	return expandTypes(included_types).flatMap(getValuesForType);
}

export { getValues };
