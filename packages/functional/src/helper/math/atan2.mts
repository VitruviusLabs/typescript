import type { PlaneCoordinatesInterface } from "./definition/interface/plane-coordinates.interface.mjs";

function atan2({ x, y }: PlaneCoordinatesInterface): number
{
	return Math.atan2(y, x);
}

export { atan2 };
