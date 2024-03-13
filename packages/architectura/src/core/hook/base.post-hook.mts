import type { ExecutionContext } from "../execution-context/execution-context.mjs";

abstract class BasePostHook
{
	public abstract execute(context: ExecutionContext): Promise<void> | void;
}

export { BasePostHook };
