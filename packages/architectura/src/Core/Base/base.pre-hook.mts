abstract class BasePreHook
{
	/**
	 * execute
	 */
	public abstract execute(): Promise<void> | void;
}

export { BasePreHook };
