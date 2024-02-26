import type { RangeInterface } from "./definition/interface/range.interface.mjs";

function clamp({ min, max }: RangeInterface): (value: number) => number
{
	return (value: number): number =>
	{
		return Math.max(min, Math.min(max, value));
	};
}

export { clamp };
