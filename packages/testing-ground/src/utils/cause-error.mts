class CauseError extends Error
{
	public readonly reason: unknown;

	public constructor(message: string, reason: unknown, options?: ErrorOptions)
	{
		super(message, options);
		this.reason = reason;
	}
}

export { CauseError };
