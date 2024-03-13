import type { ExecutionContext } from "../execution-context/execution-context.mjs";

abstract class BasePreHook
{
	public abstract execute(context: ExecutionContext): Promise<void> | void;
}

export { BasePreHook };
