interface ExecutorInstantiationInterface
{
	maxTries: number;
	baseDelay: number;
	callback: () => Promise<void>;
	customDelayCalculator?: (previousDelay: number) => number;
}

export type { ExecutorInstantiationInterface };
