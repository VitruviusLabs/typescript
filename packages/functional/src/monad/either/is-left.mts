import type { LeftInterface } from "./definition/interface/left.interface.mjs";
import type { EitherType } from "./definition/type/either.type.mjs";

function isLeft<A, B>(value: EitherType<A, B>): value is LeftInterface<A>
{
	return Object.hasOwn(value, "left");
}

export { isLeft };
