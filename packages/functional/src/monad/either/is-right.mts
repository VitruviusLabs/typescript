import type { RightInterface } from "./definition/interface/right.interface.mjs";
import type { EitherType } from "./definition/type/either.type.mjs";

function isRight<A, B>(value: EitherType<A, B>): value is RightInterface<B>
{
	return Object.hasOwn(value, "right");
}

export { isRight };
