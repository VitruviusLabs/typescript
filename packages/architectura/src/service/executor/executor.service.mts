import type { ExecutorInstantiationInterface } from "./definition/interface/executor-instantiation.interface.mjs";
import { setTimeout as timeout } from "node:timers/promises";
import { isFunction } from "@vitruvius-labs/ts-predicate/type-guard";

class ExecutorService
{
	private readonly maxTries: number;
	private readonly retryDelay: number;
	private readonly callback: (() => Promise<void> | void);
	private readonly customComputeDelay: ((tries: number, retry_delay: number) => number) | undefined;

	protected constructor(value: ExecutorInstantiationInterface)
	{
		this.maxTries = value.maxTries;
		this.retryDelay = value.retryDelay;

		this.callback = value.callback;

		if (isFunction(value.customDelayComputor))
		{
			this.customComputeDelay = value.customDelayComputor;
		}
	}

	public static Create(value: ExecutorInstantiationInterface): ExecutorService
	{
		return new ExecutorService(value);
	}

	public async execute(): Promise<void>
	{
		for (let tries: number = 0; tries < this.maxTries; ++tries)
		{
			try
			{
				await this.callback();

				return;
			}
			catch
			{
				await timeout(this.computeDelay(tries + 1));
			}
		}
	}

	private computeDelay(failed_tries: number): number
	{
		if (this.customComputeDelay === undefined)
		{
			return this.retryDelay * failed_tries;
		}

		return this.customComputeDelay(failed_tries, this.retryDelay);
	}
}

export { ExecutorService };
