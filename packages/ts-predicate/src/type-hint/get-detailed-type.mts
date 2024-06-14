// eslint-disable-next-line @ts/ban-types -- Generic type is enough as we won't invoke it
function getDetailedFunctionType(value: Function): string
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

function getDetailedType(value: unknown): string
{
	if (typeof value === "function")
	{
		return getDetailedFunctionType(value);
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

		// eslint-disable-next-line @ts/no-unsafe-assignment -- Prototype is loosely typed
		const PROTO: object | null = Object.getPrototypeOf(value);

		if (PROTO === null)
		{
			return "null-prototype object";
		}

		if (PROTO === Object.prototype)
		{
			return "generic object";
		}

		if (PROTO.constructor.name === "")
		{
			return "instance of anonymous class";
		}

		return `instance of ${PROTO.constructor.name}`;
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
		/* a UUID is 36 characters */
		const MAX_LENGTH: number = 36;

		if (value.includes("\n") || value.includes('"') || value.length > MAX_LENGTH)
		{
			return `string (${value.length.toString()} characters)`;
		}

		return `string ("${value}")`;
	}

	if (typeof value === "symbol")
	{
		return value.toString().replace("Symbol", "symbol ");
	}

	return typeof value;
}

export { getDetailedType };
