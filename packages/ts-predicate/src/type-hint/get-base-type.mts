function getBaseType(value: unknown): string
{
	if (typeof value === "function")
	{
		const CODE: string = value.toString();

		if (CODE.startsWith("class") || /^function [A-Z]/.test(CODE))
		{
			return "class";
		}

		if (/^async function ?\*/.test(CODE) || /^async ?\*/.test(CODE))
		{
			return "async generator";
		}

		if (/^function ?\*/.test(CODE) || CODE.startsWith("*"))
		{
			return "generator";
		}

		if (CODE.startsWith("async"))
		{
			return "async function";
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
