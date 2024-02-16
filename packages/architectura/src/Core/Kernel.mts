import { AsyncLocalStorage } from "node:async_hooks";

import type { ExecutionContext } from "./ExecutionContext.mjs";

import type { ConstructorOf } from "../utils/ConstructorOf.mjs";

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

	//public static GetExecutionContext<CustomContext extends typeof ExecutionContext>(customClass: CustomContext): ReturnType<CustomContext["Create"]>
	public static GetExecutionContext<CustomContext extends ExecutionContext>(customClass: ConstructorOf<CustomContext>): CustomContext
	{
		const CONTEXT: ExecutionContext | undefined = this.ContextAccessor.getStore();

		if (CONTEXT === undefined)
		{
			throw new Error('No execution context found.');
		}

        if (CONTEXT instanceof customClass)
        {
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
