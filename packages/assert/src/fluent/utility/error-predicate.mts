import { deepStrictEqual } from "assert";
import { getType } from "./get-type.mjs";

class ErrorPredicate
{
	public static Create(base_sentence: string, expected?: Error | ErrorConstructor | RegExp | string): (value: unknown) => true
	{
		if (expected instanceof Error)
		{
			return ErrorPredicate.CreateFromError(base_sentence, expected);
		}

		if (typeof expected === "string")
		{
			return ErrorPredicate.CreateFromString(base_sentence, expected);
		}

		if (typeof expected === "function")
		{
			return ErrorPredicate.CreateFromErrorConstructor(base_sentence, expected);
		}

		if (expected instanceof RegExp)
		{
			return ErrorPredicate.CreateFromRegExp(base_sentence, expected);
		}

		return ErrorPredicate.CreateDefault(base_sentence);
	}

	public static CreateFromError(base_sentence: string, expected: Error): (value: unknown) => true
	{
		if (expected.message.length === 0)
		{
			throw new Error("An error message must never be empty.");
		}

		return (value: unknown): true =>
		{
			ErrorPredicate.AssertError(base_sentence, value);

			ErrorPredicate.FixError(value);
			ErrorPredicate.FixError(expected);

			deepStrictEqual(value, expected, `${base_sentence} with an error that resemble the expected error`);

			return true;
		};
	}

	public static CreateFromErrorConstructor(base_sentence: string, expected: ErrorConstructor): (value: unknown) => true
	{
		if (expected !== Error && !(expected.prototype instanceof Error))
		{
			throw new Error("The expected class must extends Error.");
		}

		return (value: unknown): true =>
		{
			ErrorPredicate.AssertError(base_sentence, value, expected);

			ErrorPredicate.ValidateMessage(base_sentence, value);

			return true;
		};
	}

	public static CreateFromString(base_sentence: string, expected: string): (value: unknown) => true
	{
		if (expected.length === 0)
		{
			throw new Error("An error message must never be empty.");
		}

		return (value: unknown): true =>
		{
			ErrorPredicate.AssertError(base_sentence, value);

			if (value.message !== expected)
			{
				throw new Error(`${base_sentence} with the message "${expected}", but got "${value.message}".`);
			}

			return true;
		};
	}

	public static CreateFromRegExp(base_sentence: string, expected: RegExp): (value: unknown) => true
	{
		return (value: unknown): true =>
		{
			ErrorPredicate.AssertError(base_sentence, value);

			ErrorPredicate.ValidateMessage(base_sentence, value);

			if (!expected.test(value.message))
			{
				throw new Error(`${base_sentence} with a message that match ${expected.toString()}, but got "${value.message}"`);
			}

			return true;
		};
	}

	public static CreateDefault(base_sentence: string): (value: unknown) => true
	{
		return (value: unknown): true =>
		{
			ErrorPredicate.AssertError(base_sentence, value);

			ErrorPredicate.ValidateMessage(base_sentence, value);

			return true;
		};
	}

	public static AssertError(base_sentence: string, value: unknown, class_constructor: new () => Error = Error): asserts value is Error
	{
		if (!(value instanceof class_constructor))
		{
			const TYPE: string = getType(value);

			throw new Error(`${base_sentence} with an instance of ${class_constructor.name}, but got ${TYPE}.`);
		}
	}

	public static ValidateMessage(base_sentence: string, value: Error): void
	{
		if (value.message.length === 0)
		{
			throw new Error(`${base_sentence} with a message.`);
		}
	}

	public static FixError(error: Error): void
	{
		for (const key of ["message", "cause", "errors", "stack"])
		{
			const DESCRIPTOR: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(error, key);

			if (DESCRIPTOR === undefined)
			{
				continue;
			}

			// Enumerability determines which properties will be compared
			DESCRIPTOR.enumerable = key !== "stack";

			Object.defineProperty(error, key, DESCRIPTOR);
		}
	}
}

export { ErrorPredicate };
