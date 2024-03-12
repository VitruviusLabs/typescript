import { TypeGuard } from "@vitruvius-labs/ts-predicate";
import type { ExecutorInstantiationInterface } from "./definition/interface/executor-instantiation.interface.mjs";

class ExecutorService
{
	private readonly maxTries: number;
	private readonly baseDelay: number;
	private readonly callback: (() => Promise<void> | void);

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

	public static Create(value: ExecutorInstantiationInterface): ExecutorService
	{
		return new ExecutorService(value);
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

	private calculateDelay(previous_delay: number): number
	{
		return previous_delay + this.baseDelay;
	}

	private async wait(delay: number): Promise<number>
	{
		const NEW_DELAY: number = this.calculateDelay(delay);

		await new Promise(
			(resolve: (value: unknown) => void): NodeJS.Timeout =>
			{
				// @TODO: We may be able to avoid this situation.
				// eslint-disable-next-line no-promise-executor-return -- This is a WIP.
				return setTimeout(resolve, NEW_DELAY);
			}
		);

		return NEW_DELAY;
	}
}

export { ExecutorService };
