import { up } from "./helper/up.mjs";

function round_up(coefficient: number): (value: number) => number
{
	return (value: number): number =>
	{
		return up(value, coefficient);
	};
}

export { round_up };
