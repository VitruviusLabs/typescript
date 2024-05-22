import type { LogLevelEnum } from "../enum/log-level.enum.mjs";

/**
 * Interface for the log context
 */
interface LogContextInterface
{
	level: LogLevelEnum;
	uuid: string | undefined;
	tag: string | undefined;
}

export type { LogContextInterface };
