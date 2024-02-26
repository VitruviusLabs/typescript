import type { ResultMatchInterface } from "./definition/interface/result-match.interface.mjs";
import type { ResultType } from "./definition/type/result.type.mjs";
import { isFailure } from "./is-failure.mjs";

function flatMatch<A, B>({ ifFailure, ifSuccess }: ResultMatchInterface<A, B, B>): (value: ResultType<A>) => B
{
	return (value: ResultType<A>): B =>
	{
		if (isFailure(value))
		{
			return ifFailure(value.error);
		}

		return ifSuccess(value.content);
	};
}

export { flatMatch };
