import { isValidationError } from "./is-validation-error.mjs";
import { wrapCause } from "./wrap-cause.mjs";

function compareErrors(value: unknown, expected: Error): void
{
	// @ts-expect-error -- constructor is badly typed
	const CONSTRUCTOR_CLASS: typeof Error = expected.constructor;

	if (!(value instanceof CONSTRUCTOR_CLASS))
	{
		throw new Error(`An instance of ${CONSTRUCTOR_CLASS.name} must be thrown.`);
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
				{ cause: wrapCause(error) }
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

	if (expected instanceof AggregateError && value instanceof AggregateError || isValidationError(expected) && isValidationError(value))
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
						{ cause: wrapCause(error) }
					);
				}
			}
		);
	}
}

export { compareErrors };
