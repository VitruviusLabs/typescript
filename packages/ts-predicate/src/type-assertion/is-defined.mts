import { isDefined as guard } from "../type-guard/is-defined.mjs";

function isDefined<Type>(value: Type): asserts value is NonNullable<Type>
{
	if (!guard(value))
	{
		throw new Error("The value must not be nullish (undefined, null, or NaN).");
	}
}

export { isDefined };
