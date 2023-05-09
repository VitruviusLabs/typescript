// cspell:ignore sonarjs
// eslint-disable-next-line sonarjs/cognitive-complexity -- useless
function getDetailedType(value: unknown): string
{
	if (typeof value === "function")
	{
		if (value.name === "")
		{
			// This is purely an optimization, so mutation testing is disabled.
			// Stryker disable next-line ConditionalExpression
			if (value.prototype === undefined)
			// Stryker disable next-line BlockStatement
			{
				return "anonymous function";
			}

			// eslint-disable-next-line @typescript-eslint/no-shadow -- not shadowing anything
			const CODE: string = value.toString();

			if (CODE.startsWith("class "))
			{
				return "anonymous class";
			}

			if (/^function ?\*/.test(CODE))
			{
				return "anonymous generator";
			}

			return "anonymous function";
		}

		const CODE: string = value.toString();

		if (CODE.startsWith("class ") || /^function [A-Z]/.test(CODE))
		{
			return `class ${value.name}`;
		}

		if (/^function ?\*/.test(CODE))
		{
			return `generator ${value.name}`;
		}

		if (/^(?:async )?\w+\(/.test(CODE))
		{
			return `method ${value.name}`;
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

	if (typeof value === "string")
	{
		return `string (${value.length.toString()} characters)`;
	}

	if (typeof value === "symbol")
	{
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- useless
		return `symbol ${value.toString().slice(6)}`;
	}

	return typeof value;
}

export { getDetailedType };
