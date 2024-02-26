import type { ValidationMatchInterface } from "./definition/interface/validation-match.interface.mjs";
import type { ValidationInterface } from "./definition/interface/validation.interface.mjs";
import { isInvalid } from "./is-invalid.mjs";

function flatMatch<A, B>({ ifInvalid, ifValid }: ValidationMatchInterface<A, B, B>): (value: ValidationInterface<A>) => B
{
	return (value: ValidationInterface<A>): B =>
	{
		if (isInvalid(value))
		{
			return ifInvalid(value.errors);
		}

		return ifValid(value.content);
	};
}

export { flatMatch };
