import type { ExecutionContext } from "../execution-context/execution-context.mjs";

/**
 * Abstract error hook.
 */
abstract class BaseErrorHook
{
	/**
	 * Process the error.
	 */
	public abstract execute(context: ExecutionContext, error: unknown): Promise<void> | void;
}

export { BaseErrorHook };
