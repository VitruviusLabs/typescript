class ValidationError extends Error
{
	// Explicitly unused
	public override readonly cause: undefined;
	// Same as AggregateError
	public readonly errors: ReadonlyArray<ValidationError>;

	public constructor(message: string, errors?: ReadonlyArray<ValidationError>)
	{
		super(message);
		this.name = ValidationError.name;
		this.cause = undefined;
		this.errors = errors ?? [];
	}
}

export { ValidationError };
