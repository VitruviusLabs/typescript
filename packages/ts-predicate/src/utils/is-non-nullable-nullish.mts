import { NoValue } from "../extended/nullish/no-value.mjs";

function isNonNullableNullish(value: unknown): value is typeof NoValue
{
	return Number.isNaN(value) || value === NoValue;
}

export { isNonNullableNullish };
