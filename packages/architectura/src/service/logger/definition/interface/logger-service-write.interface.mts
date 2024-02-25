import type { LogLevelEnum } from "../enum/log-level.enum.mjs";

interface LoggerServiceWriteInterface
{
	level: LogLevelEnum;
	message: string;
	context: string | undefined;
}

export type { LoggerServiceWriteInterface };
