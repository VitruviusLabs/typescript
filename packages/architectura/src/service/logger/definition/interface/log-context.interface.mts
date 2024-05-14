import type { LogLevelEnum } from "../enum/log-level.enum.mjs";

interface LogContextInterface
{
	level: LogLevelEnum;
	uuid: string | undefined;
	tag: string | undefined;
}

export type { LogContextInterface };
