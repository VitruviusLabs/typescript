class UnknownError extends Error
{
	public readonly reason: unknown;

	public constructor(message: string, reason: unknown, options?: ErrorOptions)
	{
		super(message, options);
		this.name = UnknownError.name;
		this.reason = reason;
	}
}

export { UnknownError };
