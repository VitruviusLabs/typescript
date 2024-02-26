import type { ValidInterface } from "./definition/interface/valid.interface.mjs";

function evaluate<A>(value: A): ValidInterface<A>
{
	return {
		content: value,
		errors: [],
	};
}

export { evaluate };
