import type { LogContextInterface } from "./log-context.interface.mjs";

/**
 * Interface for a custom logger
 */
interface LoggerInterface
{
	handleMessage: (message: string, context: LogContextInterface) => Promise<void> | void;
	handleError: (error: Error, context: LogContextInterface) => Promise<void> | void;
}

export type { LoggerInterface };
