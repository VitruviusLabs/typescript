import type { NothingInterface } from "./definition/interface/nothing.interface.mjs";

const NOTHING: NothingInterface = {
	nothing: Symbol("Nothing"),
};

function nothing(): NothingInterface
{
	return NOTHING;
}

export { nothing };
