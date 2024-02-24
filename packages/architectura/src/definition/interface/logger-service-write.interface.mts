import type { LogLevelEnum } from "../index.mjs";

interface LoggerServiceWriteInterface {
    level: LogLevelEnum;
    message: string;
    context: string | undefined;
}

export type { LoggerServiceWriteInterface };
