/**
 * Abstract domain
 */
abstract class BaseDomain
{
	protected static InitializedPromise: Promise<void> | undefined = undefined;

	/**
	 * Domains are meant to be static classes
	 *
	 * @sealed
	 */
	protected constructor() {}

	public static async InitializeOnce(): Promise<void>
	{
		if (this.InitializedPromise === undefined)
		{
			this.InitializedPromise = this.Initialize();
		}

		await this.InitializedPromise;
	}

	/**
	 * Domain initialization
	 *
	 * @remarks
	 * This method is automatically called by DomainService when exploring folders for domains.
	 * Override this method with all that can be needed for your domain to work, like adding endpoints and hooks.
	 */
	public static async Initialize(): Promise<void>
	{
		await Promise.resolve();
	}
}

export { BaseDomain };
