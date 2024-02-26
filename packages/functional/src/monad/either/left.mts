import type { LeftInterface } from "./definition/interface/left.interface.mjs";

function left<A>(value: A): LeftInterface<A>
{
	return {
		left: value,
	};
}

export { left };
