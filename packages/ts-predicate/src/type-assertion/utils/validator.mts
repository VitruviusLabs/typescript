import type { ValidationError } from "./validation-error.mjs";
import { ValidationResult } from "./validation-result.mjs";
import { rethrowUnexpectedError } from "../../utils/rethrow-unexpected-error.mjs";

class Validator<T>
{
	private readonly assertor: (arg: unknown) => asserts arg is T;

	public constructor(assertor: (arg: unknown) => asserts arg is T)
	{
		this.assertor = assertor;
	}

	public assert(value: unknown): asserts value is T
	{
		this.assertor(value);
	}

	public guard(value: unknown): value is T
	{
		try
		{
			this.assertor(value);

			return true;
		}
		catch (error: unknown)
		{
			rethrowUnexpectedError(error);

			return false;
		}
	}

	public validate(value: unknown): ValidationError | undefined
	{
		try
		{
			this.assertor(value);

			return undefined;
		}
		catch (error: unknown)
		{
			rethrowUnexpectedError(error);

			return error;
		}
	}

	public evaluate(value: unknown): ValidationResult<T>
	{
		try
		{
			this.assertor(value);

			return new ValidationResult<T>(value);
		}
		catch (error: unknown)
		{
			rethrowUnexpectedError(error);

			return new ValidationResult<T>(error);
		}
	}
}

export { Validator };
