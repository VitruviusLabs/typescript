/**
 * Abstract domain
 */
abstract class BaseDomain
{
	protected static Initialized: boolean = false;

	/**
	 * Domains are meant to be static classes
	 *
	 * @sealed
	 */
	protected constructor() {}

	public static async InitializeOnce(): Promise<void>
	{
		if (!this.Initialized)
		{
			this.Initialized = true;

			await this.Initialize();
		}
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
