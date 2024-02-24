interface ExecutorInstantiationInterface
{
	maxTries: number;
	baseDelay: number;
	callback: () => Promise<void>;
	customDelayCalculator?: (previous_delay: number) => number;
}

export type { ExecutorInstantiationInterface };
