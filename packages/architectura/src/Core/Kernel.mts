import { AsyncLocalStorage } from "node:async_hooks";

import { ExecutionContext } from "./ExecutionContext.mjs";

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

	public static GetUnsafeExecutionContext(): ExecutionContext | undefined
	{
		return this.GetContextAccessor().getStore();
	}

	public static GetExecutionContext<CustomContext extends ExecutionContext = ExecutionContext>(
		// @ts-expect-error: CustomContext extends ExecutionContext
		custom_class: ConstructorOf<CustomContext> = ExecutionContext
	): CustomContext
	{
		const CONTEXT: ExecutionContext | undefined = this.ContextAccessor.getStore();

		if (CONTEXT === undefined)
		{
			throw new Error('No execution context found.');
		}

        if (CONTEXT instanceof custom_class)
        {
			// @ts-expect-error: CustomContext extends ExecutionContext
			return CONTEXT;
        }

		throw new Error('Execution context do not inherit from custom class constructor.');
	}

	public static SetExecutionContext(execution_context: ExecutionContext): void
	{
		this.GetContextAccessor().enterWith(execution_context);
	}
}

export { Kernel };
