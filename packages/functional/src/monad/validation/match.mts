import { type EitherType, left, right } from "../either/_index.mjs";
import type { ValidationInterface } from "./definition/interface/validation.interface.mjs";
import type { ValidationMatchInterface } from "./definition/interface/validation-match.interface.mjs";
import { isInvalid } from "./is-invalid.mjs";

function match<A, B, C>({ ifInvalid, ifValid }: ValidationMatchInterface<A, B, C>): (value: ValidationInterface<A>) => EitherType<B, C>
{
	return (value: ValidationInterface<A>): EitherType<B, C> =>
	{
		if (isInvalid(value))
		{
			return left(ifInvalid(value.errors));
		}

		return right(ifValid(value.content));
	};
}

export { match };
