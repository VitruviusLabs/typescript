import { AsyncLocalStorage } from "node:async_hooks";

import { ExecutionContextService } from "./execution-context.service.mjs";

import type { ConstructorOf } from "../../index.mjs";

abstract class ExecutionContextRegistry
{
	private static ContextAccessor: AsyncLocalStorage<ExecutionContextService>;

	static
	{
		this.ContextAccessor = new AsyncLocalStorage();
	}

	public static GetContextAccessor(): AsyncLocalStorage<ExecutionContextService>
	{
		return this.ContextAccessor;
	}

	public static GetUnsafeExecutionContext(): ExecutionContextService | undefined
	{
		return this.GetContextAccessor().getStore();
	}

	public static GetExecutionContext<CustomContext extends ExecutionContextService = ExecutionContextService>(
		// @ts-expect-error: CustomContext extends ExecutionContext
		custom_class: ConstructorOf<CustomContext> = ExecutionContextService
	): CustomContext
	{
		const CONTEXT: ExecutionContextService | undefined = this.ContextAccessor.getStore();

		if (CONTEXT === undefined)
		{
			throw new Error('No execution context found.');
		}

        if (CONTEXT instanceof custom_class)
        {
			return CONTEXT;
        }

		throw new Error('Execution context do not inherit from custom class constructor.');
	}

	public static SetExecutionContext(execution_context: ExecutionContextService): void
	{
		this.GetContextAccessor().enterWith(execution_context);
	}
}

export { ExecutionContextRegistry as KernelService };
