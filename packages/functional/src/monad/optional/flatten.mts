import type { OptionalType } from "./definition/type/optional.type.mjs";
import { isNothing } from "./is-nothing.mjs";

function flatten<A>(value: OptionalType<OptionalType<A>>): OptionalType<A>
{
	if (isNothing(value))
	{
		return value;
	}

	return value.content;
}

export { flatten };
