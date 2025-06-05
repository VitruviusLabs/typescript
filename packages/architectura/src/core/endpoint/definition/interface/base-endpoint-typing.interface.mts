interface BaseEndpointTypingInterface
{
	pathFragments?: Record<string, string>;
	query?: Record<string, string>;
	payload?: Record<string, unknown>;
	response?: Record<string, unknown>;
}

export type { BaseEndpointTypingInterface };
