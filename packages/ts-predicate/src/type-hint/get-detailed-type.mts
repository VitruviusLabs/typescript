function getDetailedType(value: unknown): string
{
	if (typeof value === "function")
	{
		const CODE: string = value.toString();

		if (value.name === "")
		{
			if (CODE.startsWith("class"))
			{
				return "anonymous class";
			}

			if (/^async function ?\*/.test(CODE))
			{
				return "anonymous async generator";
			}

			if (/^function ?\*/.test(CODE))
			{
				return "anonymous generator";
			}

			if (CODE.startsWith("async"))
			{
				return "anonymous async function";
			}

			return "anonymous function";
		}

		if (CODE.startsWith("class") || /^function [A-Z]/.test(CODE))
		{
			return `class ${value.name}`;
		}

		if (/^async function ?\*/.test(CODE) || /^async ?\*/.test(CODE))
		{
			return `async generator ${value.name}`;
		}

		if (/^function ?\*/.test(CODE) || CODE.startsWith("*"))
		{
			return `generator ${value.name}`;
		}

		if (CODE.startsWith("async"))
		{
			return `async function ${value.name}`;
		}

		return `function ${value.name}`;
	}

	if (typeof value === "object")
	{
		if (value === null)
		{
			return "null";
		}

		if (Array.isArray(value))
		{
			return `array (${value.length.toString()} items)`;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Prototype is loosely typed
		const PROTO: object | null = Object.getPrototypeOf(value);

		if (PROTO === null || PROTO === Object.prototype)
		{
			return "anonymous object";
		}

		if (PROTO.constructor.name === "")
		{
			return "object anonymous class";
		}

		return `object ${PROTO.constructor.name}`;
	}

	if (Number.isNaN(value))
	{
		return "NaN";
	}

	if (typeof value === "boolean")
	{
		if (value)
		{
			return "boolean (true)";
		}

		return "boolean (false)";
	}

	if (typeof value === "number")
	{
		return `number (${value.toString()})`;
	}

	if (typeof value === "bigint")
	{
		return `bigint (${value.toString()})`;
	}

	if (typeof value === "string")
	{
		return `string (${value.length.toString()} characters)`;
	}

	if (typeof value === "symbol")
	{
		return value.toString().replace("Symbol", "symbol ");
	}

	return typeof value;
}

export { getDetailedType };
