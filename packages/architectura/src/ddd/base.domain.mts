/**
 * Abstract domain
 */
abstract class BaseDomain
{
	private constructor() {}

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
