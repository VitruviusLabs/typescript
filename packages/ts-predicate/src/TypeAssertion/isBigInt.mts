import { isBigInt as guard } from "../TypeGuard/isBigInt.mjs";

function isBigInt(value: unknown): asserts value is bigint
{
	if (!guard(value))
	{
		throw new Error("The value must be a big integer.");
	}
}

export { isBigInt };
