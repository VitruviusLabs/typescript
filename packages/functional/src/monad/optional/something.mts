import type { SomethingInterface } from "./definition/_index.mjs";

function something<A>(value: A): SomethingInterface<A>
{
	return {
		content: value,
	};
}

export { something };
