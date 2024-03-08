import type { ExecutionContext } from "../core/execution-context/execution-context.mjs";

abstract class BasePostHook
{
	/**
	 * execute
	 */
	public abstract execute(context: ExecutionContext): Promise<void> | void;
}

export { BasePostHook };
