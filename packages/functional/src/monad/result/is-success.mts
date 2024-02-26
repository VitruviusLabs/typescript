import type { SuccessInterface } from "./definition/interface/success.interface.mjs";
import type { ResultType } from "./definition/type/result.type.mjs";

function isSuccess<A>(value: ResultType<A>): value is SuccessInterface<A>
{
	return Object.hasOwn(value, "content");
}

export { isSuccess };
