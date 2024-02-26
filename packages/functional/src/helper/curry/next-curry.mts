import type { CallableType } from "./definition/type/callable.type.mjs";

function nextCurry(callable: CallableType, args: ReadonlyArray<unknown>): CallableType
{
	return (value: unknown): unknown =>
	{
		const ARGS: Array<unknown> = [...args, value];

		if (ARGS.length === callable.length)
		{
			return callable(...ARGS);
		}

		return nextCurry(callable, [...ARGS]);
	};
}

export { nextCurry };
