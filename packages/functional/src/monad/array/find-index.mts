import { type OptionalType, nothing, something } from "../optional/_index.mjs";
import { ArrayConstantEnum } from "./definition/enum/array-constant.enum.mjs";

function findIndex<A>(callable: (item: A) => boolean): (value: ReadonlyArray<A>) => OptionalType<number>
{
	return (value: ReadonlyArray<A>): OptionalType<number> =>
	{
		const INDEX: number = value.findIndex(callable);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- Perfectly safe
		if (INDEX === ArrayConstantEnum.NOT_FOUND)
		{
			return nothing();
		}

		return something(INDEX);
	};
}

export { findIndex };
