import type { ExecutionContext } from "../execution-context/execution-context.mjs";

/**
 * Abstract pre hook.
 */
abstract class BasePreHook
{
	/**
	 * Perform the pre-process.
	 */
	public abstract execute(context: ExecutionContext): Promise<void> | void;
}

export { BasePreHook };
