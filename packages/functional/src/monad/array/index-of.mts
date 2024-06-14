import { type OptionalType, nothing, something } from "../optional/_index.mjs";
import { ArrayConstantEnum } from "./definition/enum/array-constant.enum.mjs";

function indexOf<A>(item: A): (value: ReadonlyArray<A>) => OptionalType<number>
{
	return (value: ReadonlyArray<A>): OptionalType<number> =>
	{
		const INDEX: number = value.indexOf(item);

		if (INDEX === ArrayConstantEnum.NOT_FOUND)
		{
			return nothing();
		}

		return something(INDEX);
	};
}

export { indexOf };
