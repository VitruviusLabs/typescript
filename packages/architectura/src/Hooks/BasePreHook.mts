abstract class BasePreHook
{
	/**
	 * Execute
	 */
	public static async Execute(): Promise<void>
	// eslint-disable-next-line @typescript-eslint/no-empty-function -- This is a dummy method that will be replaced when the class is extended.
	{}
}

export { BasePreHook };
