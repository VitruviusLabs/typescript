import type { ResultType } from "./definition/type/result.type.mjs";
import { failure } from "./failure.mjs";
import { success } from "./success.mjs";

function convertValue<A>(value: A | null | undefined): ResultType<A>
{
	if (value === undefined || value === null || Number.isNaN(value))
	{
		return failure(new Error("No result"));
	}

	return success(value);
}

export { convertValue };
