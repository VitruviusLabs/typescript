import type { OptionalType } from "./definition/_index.mjs";
import { nothing } from "./nothing.mjs";
import { something } from "./something.mjs";

function convertValue<A>(value: A | null | undefined): OptionalType<A>
{
	if (value === undefined || value === null || Number.isNaN(value))
	{
		return nothing();
	}

	return something(value);
}

export { convertValue };
