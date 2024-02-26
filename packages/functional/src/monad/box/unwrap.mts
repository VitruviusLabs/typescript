import type { BoxInterface } from "./definition/interface/box.interface.mjs";

function unwrap<A>(value: BoxInterface<A>): A
{
	return value.content;
}

export { unwrap };
