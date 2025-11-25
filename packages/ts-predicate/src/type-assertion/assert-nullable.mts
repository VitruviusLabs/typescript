import { isNullable } from "../type-guard/is-nullable.mjs";

function assertNullable(value: unknown): asserts value is null | undefined
{
	if (!isNullable(value))
	{
		throw new TypeError("Value must be null or undefined.");
	}
}

export { assertNullable };
