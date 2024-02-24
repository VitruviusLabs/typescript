import type { LogLevelEnum } from "../_index.mjs";

interface LoggerServiceWriteInterface {
    level: LogLevelEnum;
    message: string;
    context: string | undefined;
}

export type { LoggerServiceWriteInterface };
