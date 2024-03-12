import type { ExecutionContext } from "../core/execution-context/execution-context.mjs";

abstract class BasePreHook
{
	public abstract execute(context: ExecutionContext): Promise<void> | void;
}

export { BasePreHook };
