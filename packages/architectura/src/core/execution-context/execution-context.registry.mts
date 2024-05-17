import { AsyncLocalStorage } from "node:async_hooks";
import type { ExecutionContext } from "./execution-context.mjs";

abstract class ExecutionContextRegistry
{
	private static readonly ContextAccessor: AsyncLocalStorage<ExecutionContext> = new AsyncLocalStorage();

	public static GetUnsafeExecutionContext(): ExecutionContext | undefined
	{
		return this.ContextAccessor.getStore();
	}

	public static GetExecutionContext(): ExecutionContext
	{
		const CONTEXT: ExecutionContext | undefined = this.GetUnsafeExecutionContext();

		if (CONTEXT === undefined)
		{
			throw new Error("No execution context found.");
		}

		return CONTEXT;
	}

	public static SetExecutionContext(execution_context: ExecutionContext): void
	{
		this.ContextAccessor.enterWith(execution_context);
	}
}

export { ExecutionContextRegistry };
