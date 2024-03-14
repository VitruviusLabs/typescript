import type { ExecutionContext } from "../execution-context/execution-context.mjs";

abstract class BaseErrorHook
{
	public abstract execute(context: ExecutionContext, error: unknown): Promise<void> | void;
}

export { BaseErrorHook };
