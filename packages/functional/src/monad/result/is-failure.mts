import type { FailureInterface } from "./definition/interface/failure.interface.mjs";
import type { ResultType } from "./definition/type/result.type.mjs";

function isFailure<A>(value: ResultType<A>): value is FailureInterface
{
	return Object.hasOwn(value, "error");
}

export { isFailure };
