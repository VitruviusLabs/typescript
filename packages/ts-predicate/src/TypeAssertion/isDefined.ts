import { isDefined as guard } from "../TypeGuard/isDefined.js";

function isDefined<Type>(value: Type): asserts value is NonNullable<Type>
{
	if (!guard(value))
	{
		throw new Error("value is undefined, null, or NaN");
	}
}

export { isDefined };
