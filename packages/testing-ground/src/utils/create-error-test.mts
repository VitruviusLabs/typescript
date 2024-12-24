import { compareErrors } from "./compare-errors.mjs";

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
