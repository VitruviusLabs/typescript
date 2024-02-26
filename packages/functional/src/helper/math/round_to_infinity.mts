import { up } from "./helper/up.mjs";
import { down } from "./helper/down.mjs";

function round_to_infinity(coefficient: number): (value: number) => number
{
	return (value: number): number =>
	{
		return (value > 0) ? up(value, coefficient) : down(value, coefficient);
	};
}

export { round_to_infinity };
