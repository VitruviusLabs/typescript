import type { NothingInterface } from "./definition/interface/nothing.interface.mjs";
import type { OptionalType } from "./definition/type/optional.type.mjs";
import { nothing } from "./nothing.mjs";

function isNothing<A>(value: OptionalType<A>): value is NothingInterface
{
	return value === nothing();
}

export { isNothing };
