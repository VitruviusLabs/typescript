import { type EitherType, left, right } from "../either/_index.mjs";
import type { ResultMatchInterface } from "./definition/interface/result-match.interface.mjs";
import type { ResultType } from "./definition/type/result.type.mjs";
import { isFailure } from "./is-failure.mjs";

function match<A, B, C>({ ifFailure, ifSuccess }: ResultMatchInterface<A, B, C>): (value: ResultType<A>) => EitherType<B, C>
{
	return (value: ResultType<A>): EitherType<B, C> =>
	{
		if (isFailure(value))
		{
			return left(ifFailure(value.error));
		}

		return right(ifSuccess(value.content));
	};
}

export { match };
