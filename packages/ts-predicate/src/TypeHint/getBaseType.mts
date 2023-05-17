function getBaseType(value: unknown): string
{
	if (typeof value === "function")
	{
		// This is purely an optimization, so mutation testing is disabled.
		// Stryker disable next-line ConditionalExpression
		if (value.prototype === undefined)
		// Stryker disable next-line BlockStatement
		{
			return "function";
		}

		const CODE: string = value.toString();

		if (CODE.startsWith("class ") || /^function [A-Z]/.test(CODE))
		{
			return "class";
		}

		if (/^function ?\*/.test(CODE))
		{
			return "generator";
		}

		return "function";
	}

	if (typeof value === "object")
	{
		if (value === null)
		{
			return "null";
		}

		if (Array.isArray(value))
		{
			return "array";
		}

		return "object";
	}

	if (Number.isNaN(value))
	{
		return "NaN";
	}

	return typeof value;
}

export { getBaseType };
