import type { ExecutionContext } from "./execution-context.mjs";
import { AsyncLocalStorage } from "node:async_hooks";

/**
 * Execution context registry.
 *
 * @remarks
 * It's main purpose is to give access to the execution context from anywhere.
 *
 * @sealed
 */
class ExecutionContextRegistry
{
	private static readonly ContextAccessor: AsyncLocalStorage<ExecutionContext> = new AsyncLocalStorage();

	/**
	 * Returns the current execution context.
	 *
	 * @remarks
	 * Also work outside the flow of a request processing.
	 */
	public static GetUnsafeExecutionContext(): ExecutionContext | undefined
	{
		return this.ContextAccessor.getStore();
	}

	/**
	 * Returns the current execution context.
	 *
	 * @remarks
	 * Only work inside the flow of a request processing.
	 */
	public static GetExecutionContext(): ExecutionContext
	{
		const CONTEXT: ExecutionContext | undefined = this.GetUnsafeExecutionContext();

		if (CONTEXT === undefined)
		{
			throw new Error("No execution context found.");
		}

		return CONTEXT;
	}

	/**
	 * Sets the current execution context.
	 *
	 * @internal
	 */
	public static SetExecutionContext(execution_context: ExecutionContext): void
	{
		this.ContextAccessor.enterWith(execution_context);
	}
}

export { ExecutionContextRegistry };
