import type { SomethingInterface } from "./definition/interface/something.interface.mjs";
import type { OptionalType } from "./definition/type/optional.type.mjs";
import { nothing } from "./nothing.mjs";

function isSomething<A>(value: OptionalType<A>): value is SomethingInterface<A>
{
	return value !== nothing() && Object.hasOwn(value, "content");
}

export { isSomething };
