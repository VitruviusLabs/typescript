import type { BoxInterface } from "./definition/interface/box.interface.mjs";

function box<A>(value: A): BoxInterface<A>
{
	return {
		content: value,
	};
}

export { box };
