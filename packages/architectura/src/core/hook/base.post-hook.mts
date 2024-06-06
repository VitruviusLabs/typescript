import type { ExecutionContext } from "../execution-context/execution-context.mjs";

/**
 * Abstract post hook.
 */
abstract class BasePostHook
{
	private readonly context: ExecutionContext | undefined = undefined;

	/**
	 * Perform the post-process.
	 */
	public abstract execute(context: ExecutionContext): Promise<void> | void;

	/**
	 * Get the execution context for this endpoint.
	 *
	 * @remarks
	 * This method is only useful for contextual endpoints.
	 * Contextual endpoints are instantiated for every matching request.
	 *
	 * @throws when called in a non-contextual endpoint.
	 *
	 * @sealed
	 */
	public getContext(): ExecutionContext
	{
		if (this.context === undefined)
		{
			throw new Error("This is not a contextual post-hook.");
		}

		return this.context;
	}
}

export { BasePostHook };
