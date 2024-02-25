import { toError } from "./to-error.mjs";

function compareErrors(value: unknown, expected: Error): void
{
	// @ts-expect-error -- constructor is badly typed
	const CONSTRUCTOR_CLASS: typeof Error = expected.constructor;

	if (!(value instanceof CONSTRUCTOR_CLASS))
	{
		throw new Error(`An ${CONSTRUCTOR_CLASS.name} must be thrown.`);
	}

	if (value.message !== expected.message)
	{
		throw new Error(`Expected error message "${expected.message}" but got "${value.message}".`);
	}

	if (expected.cause instanceof Error)
	{
		if (value.cause === undefined)
		{
			throw new Error("It must have a cause.");
		}

		try
		{
			compareErrors(value.cause, expected.cause);
		}
		catch (error: unknown)
		{
			throw new Error(
				"Invalid cause error.",
				{ cause: toError(error) }
			);
		}
	}
	else
	{
		// eslint-disable-next-line no-lonely-if -- Symmetry of intent
		if (value.cause !== undefined)
		{
			throw new Error("It must not have a cause.");
		}
	}

	if (expected instanceof AggregateError && value instanceof AggregateError)
	{
		if (value.errors.length !== expected.errors.length)
		{
			throw new Error(`Expected ${expected.errors.length.toFixed(0)} errors but got ${value.errors.length.toFixed(0)}.`);
		}

		expected.errors.forEach(
			(item: Error, index: number): void =>
			{
				try
				{
					compareErrors(value.errors[index], item);
				}
				catch (error: unknown)
				{
					throw new Error(
						`Invalid error at index ${index.toFixed(0)}.`,
						{ cause: toError(error) }
					);
				}
			}
		);
	}
}

function createErrorTest(expected_error?: Error | RegExp | string): (value: unknown) => true
{
	return (value: unknown): true =>
	{
		if (expected_error === undefined || expected_error instanceof RegExp)
		{
			if (!(value instanceof Error))
			{
				throw new Error("An Error must be thrown.");
			}

			if (value.message.length === 0)
			{
				throw new Error("An error must have a message.");
			}

			if (expected_error instanceof RegExp && !expected_error.test(value.message))
			{
				throw new Error(`Expected error message to match ${expected_error.toString()} but got "${value.message}"`);
			}
		}
		else if (expected_error instanceof Error)
		{
			compareErrors(value, expected_error);
		}
		else
		{
			compareErrors(value, new Error(expected_error));
		}

		return true;
	};
}

export { createErrorTest };
