import { type OptionalType, nothing, something } from "../optional/_index.mjs";
import { ArrayConstantEnum } from "./definition/enum/array-constant.enum.mjs";

function lastIndexOf<A>(item: A): (value: ReadonlyArray<A>) => OptionalType<number>
{
	return (value: ReadonlyArray<A>): OptionalType<number> =>
	{
		const INDEX: number = value.indexOf(item);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison -- Perfectly safe
		if (INDEX === ArrayConstantEnum.NOT_FOUND)
		{
			return nothing();
		}

		return something(INDEX);
	};
}

export { lastIndexOf };
