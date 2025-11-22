interface BaseEndpointTypingInterface
{
	pathVariables?: Record<string, string>;
	query?: Record<string, string>;
	payload?: Record<string, unknown>;
	response?: Record<string, unknown>;
}

export type { BaseEndpointTypingInterface };
