interface ExecutorInstantiationInterface
{
	maxTries: number;
	retryDelay: number;
	callback: () => Promise<void>;
	customDelayComputor?: (failed_tries: number, retry_delay: number) => number;
}

export type { ExecutorInstantiationInterface };
