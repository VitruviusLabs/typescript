import type { RightInterface } from "./definition/interface/right.interface.mjs";

function right<B>(value: B): RightInterface<B>
{
	return {
		right: value,
	};
}

export { right };
