import type { LoggerServiceWriteInterface } from "./definition/interface/logger-service-write.interface.mjs";
import type { LoggerInterface } from "./definition/interface/logger.interface.mjs";
import { Singleton } from "../../utility/singleton.mjs";
import { StackTraceParserService } from "../stack-trace-parser/stack-trace-parser.service.mjs";
import { DateEnum } from "../../definition/enum/date.enum.mjs";
import { LogLevelEnum } from "./definition/enum/log-level.enum.mjs";

class LoggerService extends Singleton implements LoggerInterface
{
	public write(content: LoggerServiceWriteInterface): void
	{
		const LEVEL: string = content.level.toUpperCase();
		const DATE: Date = new Date();
		const FORMATTED_DATE: string = DATE.toISOString().slice(0, DateEnum.ISO_DATETIME_LENGTH).replace("T", " ");

		let logLinePrefix: string = `[${FORMATTED_DATE}] [${LEVEL}]`;

		if (content.context !== undefined)
		{
			logLinePrefix = `${logLinePrefix} [${content.context}]`;
		}

		const LOG_LINE: string = `${logLinePrefix} - ${content.message}\n`;

		// eslint-disable-next-line no-console -- This is a logger, it should log to the console.
		console.log(LOG_LINE);
	}

	public debug(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.DEBUG,
			message: message,
			context: context,
		});
	}

	public informational(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.INFO,
			message: message,
			context: context,
		});
	}

	public info(message: string, context?: string): void
	{
		this.informational(message, context);
	}

	public notice(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.NOTICE,
			message: message,
			context: context,
		});
	}

	public warning(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.WARNING,
			message: message,
			context: context,
		});
	}

	public error(content: Error | string, context?: string): void
	{
		if (content instanceof Error)
		{
			this.logError(content);

			return;
		}

		this.write({
			level: LogLevelEnum.ERROR,
			message: content,
			context: context,
		});
	}

	public critical(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.CRITICAL,
			message: message,
			context: context,
		});
	}

	public alert(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.ALERT,
			message: message,
			context: context,
		});
	}

	public emergency(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.EMERGENCY,
			message: message,
			context: context,
		});
	}

	private logError(error: Error): void
	{
		const STACK_TRACE_PARSER: StackTraceParserService = new StackTraceParserService(error);
		const FORMATTED_STACK_TRACE: Array<string> = STACK_TRACE_PARSER.getStackTraceAsTable();

		this.error(error.message);

		for (const LINE of FORMATTED_STACK_TRACE)
		{
			this.error(LINE);
		}
	}
}

export { LoggerService };
