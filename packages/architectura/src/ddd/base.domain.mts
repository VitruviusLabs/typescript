// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- For auto discovery
abstract class BaseDomain
{
	protected constructor() {}

	public static async Initialize(): Promise<void>
	{
		await Promise.resolve();
	}
}

export { BaseDomain };
