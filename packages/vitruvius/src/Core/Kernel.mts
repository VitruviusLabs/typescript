import { AsyncLocalStorage } from "node:async_hooks";

import type { ExecutionContext } from "./ExecutionContext.mjs";

abstract class Kernel
{
	private static ContextAccessor: AsyncLocalStorage<ExecutionContext>;

	static
	{
		this.ContextAccessor = new AsyncLocalStorage();
	}

	public static GetContextAccessor(): AsyncLocalStorage<ExecutionContext>
	{
		return this.ContextAccessor;
	}

	public static GetExecutionContext(): ExecutionContext | undefined
	{
		return this.GetContextAccessor().getStore();
	}

	public static SetExecutionContext(execution_context: ExecutionContext): void
	{
		this.GetContextAccessor().enterWith(execution_context);
	}
}

export { Kernel };