import type { ArrayConstraints } from "../Types/_index.js";

function isArray<Type>(value: unknown, constraints?: ArrayConstraints<Type>): value is Array<Type>
{
	if (!Array.isArray(value))
	{
		return false;
	}

	if (constraints === undefined)
	{
		return true;
	}

	if (constraints.minLength !== undefined && value.length < constraints.minLength)
	{
		return false;
	}

	if (constraints.itemGuard !== undefined)
	{
		return value.every(constraints.itemGuard);
	}

	return true;
}

export { isArray };
