import type { NonNullish } from "../extended/nullish/definition/type/non-nullish.mjs";
import { isNullish } from "../extended/nullish/predicate/type-guard/is-nullish.mjs";

function isDefined<Type>(value: Type): value is NonNullish<Type>
{
	return !isNullish(value);
}

export { isDefined };
