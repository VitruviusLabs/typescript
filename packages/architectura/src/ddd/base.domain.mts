abstract class BaseDomain
{
	protected constructor() {}

	public static async Initialize(): Promise<void>
	{
		await Promise.resolve();
	}
}

export { BaseDomain };
