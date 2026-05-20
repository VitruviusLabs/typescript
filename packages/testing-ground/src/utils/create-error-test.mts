import type { ErrorConstructorType } from "../definition/type/error-constructor.type.mjs";
import { compareErrors } from "./compare-errors.mjs";
import { validateError } from "./validate-error.mjs";

function createErrorTest(expected_error?: Error | ErrorConstructorType | RegExp | string): (value: unknown) => true
{
	return (value: unknown): true =>
	{
		if (expected_error instanceof Error)
		{
			compareErrors(value, expected_error);

			return true;
		}

		if (typeof expected_error === "string")
		{
			compareErrors(value, new Error(expected_error));

			return true;
		}

		if (typeof expected_error === "function")
		{
			validateError(value, expected_error);

			return true;
		}

		validateError(value, Error);

		if (expected_error instanceof RegExp && !expected_error.test(value.message))
		{
			throw new Error(`Expected error message to match ${expected_error.toString()} but got "${value.message}".`);
		}

		return true;
	};
}

export { createErrorTest };
