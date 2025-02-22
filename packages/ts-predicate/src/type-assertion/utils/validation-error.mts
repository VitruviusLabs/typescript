class ValidationError extends Error
{
	// Same as AggregateError
	public readonly errors: ReadonlyArray<ValidationError>;

	public constructor(message: string, errors?: ReadonlyArray<ValidationError>, options?: ErrorOptions)
	{
		super(message, options);
		this.name = ValidationError.name;
		this.errors = errors ?? [];
	}
}

export { ValidationError };
