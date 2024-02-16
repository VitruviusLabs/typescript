abstract class BasePostHook
{
	/**
	 * execute
	 */
	public abstract execute(): Promise<void> | void;
}

export { BasePostHook };
