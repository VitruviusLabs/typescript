import type { ExecutionContext } from "../core/execution-context/execution-context.mjs";

abstract class BaseErrorHook
{
	/**
	 * execute
	 */
	public abstract execute(context: ExecutionContext, error: unknown): Promise<void> | void;
}

export { BaseErrorHook };
