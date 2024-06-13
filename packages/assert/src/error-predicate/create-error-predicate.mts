import { deepStrictEqual } from "assert";
import { getType } from "../utility/get-type.mjs";
import { fixError } from "./fix-error.mjs";

function createErrorPredicate(base_sentence: string, expected?: Error | ErrorConstructor | RegExp | string): (value: unknown) => true
{
	if (expected instanceof Error)
	{
		if (expected.message.length === 0)
		{
			throw new Error("An error message must never be empty.");
		}
	}
	else if (typeof expected === "string")
	{
		if (expected.length === 0)
		{
			throw new Error("An error message must never be empty.");
		}
	}
	else if (typeof expected === "function")
	{
		if (expected !== Error && !(expected.prototype instanceof Error))
		{
			throw new Error("The expected class must extends Error.");
		}
	}

	return (value: unknown): true =>
	{
		if (typeof expected === "function")
		{
			if (!(value instanceof expected))
			{
				const TYPE: string = getType(value);

				throw new Error(`${base_sentence} with an instance of ${expected.name}, but got ${TYPE}.`);
			}
		}
		else if (!(value instanceof Error))
		{
			const TYPE: string = getType(value);

			throw new Error(`${base_sentence} with an instance of Error, but got ${TYPE}.`);
		}

		if (expected instanceof Error)
		{
			deepStrictEqual(fixError(value), fixError(expected), `${base_sentence} with an error that resemble the expected error`);
		}

		if (expected instanceof RegExp)
		{
			if (!expected.test(value.message))
			{
				throw new Error(`${base_sentence} with a message that match ${expected.toString()}, but got "${value.message}"`);
			}
		}

		if (typeof expected === "string")
		{
			if (value.message !== expected)
			{
				throw new Error(`${base_sentence} with the message "${expected}", but got "${value.message}".`);
			}
		}
		else if (value.message.length === 0)
		{
			throw new Error(`${base_sentence} with a message.`);
		}

		return true;
	};
}

export { createErrorPredicate };
