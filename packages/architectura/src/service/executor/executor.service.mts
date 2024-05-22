import type { ExecutorInstantiationInterface } from "./definition/interface/executor-instantiation.interface.mjs";
import { setTimeout as timeout } from "node:timers/promises";
import { isFunction } from "@vitruvius-labs/ts-predicate/type-guard";

/**
 * Service for executing a callable with retries
 */
class ExecutorService
{
	private readonly maxTries: number;
	private readonly retryDelay: number;
	private readonly callable: (() => Promise<void> | void);
	private readonly customComputeDelay: ((tries: number, retry_delay: number) => number) | undefined;

	/**
	 * Create a new executor service
	 */
	public constructor(value: ExecutorInstantiationInterface)
	{
		this.maxTries = value.maxTries;
		this.retryDelay = value.retryDelay;

		this.callable = value.callable;

		if (isFunction(value.customDelayComputor))
		{
			this.customComputeDelay = value.customDelayComputor;
		}
	}

	/**
	 * Create a new executor service
	 */
	public static Create(value: ExecutorInstantiationInterface): ExecutorService
	{
		return new ExecutorService(value);
	}

	/**
	 * Execute the callable
	 *
	 * @throws if the callable fails after the maximum number of tries
	 */
	public async execute(): Promise<void>
	{
		for (let tries: number = 0; tries < this.maxTries; ++tries)
		{
			try
			{
				await this.callable();

				return;
			}
			catch
			{
				await timeout(this.computeDelay(tries + 1));
			}
		}

		throw new Error("Failed to execute the callable.");
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
