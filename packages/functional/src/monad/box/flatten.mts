import type { BoxInterface } from "./definition/interface/box.interface.mjs";

function flatten<A>(value: BoxInterface<BoxInterface<A>>): BoxInterface<A>
{
	return value.content;
}

export { flatten };
