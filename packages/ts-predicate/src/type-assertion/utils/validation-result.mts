import { ValidationError } from "./validation-error.mjs";

class ValidationResult<T>
{
	private readonly value: T | ValidationError;

	public constructor(value: T | ValidationError)
	{
		this.value = value;
	}

	public onSuccess(callback: (value: T) => void): void
	{
		if (!(this.value instanceof ValidationError))
		{
			callback(this.value);
		}
	}

	public onFailure(callback: (error: ValidationError) => void): void
	{
		if (this.value instanceof ValidationError)
		{
			callback(this.value);
		}
	}

	public then(onSuccess: (value: T) => void, onFailure: (error: ValidationError) => void): void
	{
		if (this.value instanceof ValidationError)
		{
			onFailure(this.value);

			return;
		}

		onSuccess(this.value);
	}
}

export { ValidationResult };
