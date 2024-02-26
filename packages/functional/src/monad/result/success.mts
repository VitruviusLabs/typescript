import type { SuccessInterface } from "./definition/interface/success.interface.mjs";

function success<A>(value: A): SuccessInterface<A>
{
	return {
		content: value,
	};
}

export { success };
