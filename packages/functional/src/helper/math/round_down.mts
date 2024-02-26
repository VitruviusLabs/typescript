import { down } from "./helper/down.mjs";

function round_down(coefficient: number): (value: number) => number
{
	return (value: number): number =>
	{
		return down(value, coefficient);
	};
}

export { round_down };
