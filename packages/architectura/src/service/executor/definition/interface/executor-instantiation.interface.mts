/**
 * Configuration for the executor instantiation
 */
interface ExecutorInstantiationInterface
{
	maxTries: number;
	retryDelay: number;
	callable: () => Promise<void>;
	/**
	 * Custom delay computation
	 *
	 * @remarks
	 * By default, the delay is `failed_tries * retry_delay`.
	 */
	customDelayComputor?: (failed_tries: number, retry_delay: number) => number;
}

export type { ExecutorInstantiationInterface };
