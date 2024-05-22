import type { ExecutionContext } from "../execution-context/execution-context.mjs";

/**
 * Abstract post hook.
 */
abstract class BasePostHook
{
	/**
	 * Perform the post-process.
	 */
	public abstract execute(context: ExecutionContext): Promise<void> | void;
}

export { BasePostHook };
