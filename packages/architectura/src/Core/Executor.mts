import { TypeGuard } from "@vitruvius-labs/ts-predicate";

import type { ExecutorInstantiationInterface } from "./Executor/ExecutorInstantiationInterface.mjs";

class Executor
{
	private readonly maxTries: number;
	private readonly baseDelay: number;

	protected constructor(value: ExecutorInstantiationInterface)
	{
		this.maxTries = value.maxTries;
		this.baseDelay = value.baseDelay;

		this.callback = value.callback;

		if (TypeGuard.hasProperty(value, "customDelayCalculator") && TypeGuard.isFunction(value.customDelayCalculator))
		{

			this.calculateDelay = value.customDelayCalculator;
		}
	}

	/**
	 * Create
	 */
	public static Create(value: ExecutorInstantiationInterface): Executor
	{
		return new Executor(value);
	}

	public async execute(): Promise<void>
	{
		let tries: number = 0;
		let delay: number = this.baseDelay;

		while (tries < this.maxTries)
		{
			try
			{
				await this.callback();

				return;
			}
			catch
			{
				++tries;
				delay = await this.wait(delay);
			}
		}
	}

	/* @ts-expect-error - This is a dummy method that is declared so it will always exist.
	* It will be replaced by the real callback when instantiated.
	*/
	// eslint-disable-next-line class-methods-use-this -- This is an exception because it's a dummy method that will be replaced by the real callback when instantiated.
	private async callback(): Promise<void>
	// eslint-disable-next-line @typescript-eslint/no-empty-function -- This is an exception because it's a dummy method that will be replaced by the real callback when instantiated.
	{ }

	private calculateDelay(previous_delay: number): number
	{
		return previous_delay + this.baseDelay;
	}

	private async wait(delay: number): Promise<number>
	{
		const NEW_DELAY: number = this.calculateDelay(delay);

		await new Promise((resolve: (value: unknown) => void): NodeJS.Timeout =>
		{
			// @TODO: We may be able to avoid this situation.
			// eslint-disable-next-line no-promise-executor-return -- This is a WIP.
			return setTimeout(resolve, NEW_DELAY);
		});

		return NEW_DELAY;
	}
}

export { Executor };
