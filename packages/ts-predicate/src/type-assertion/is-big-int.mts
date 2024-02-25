import { isBigInt as guard } from "../type-guard/is-big-int.mjs";

function isBigInt(value: unknown): asserts value is bigint
{
	if (!guard(value))
	{
		throw new Error("The value must be a big integer.");
	}
}

export { isBigInt };
