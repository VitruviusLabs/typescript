import { Singleton } from "../../Core/singleton.mjs";

import { LogLevelEnum } from "../../definition/enum/log-level.enum.mjs";

import { Time } from "../../_index.mjs";

import { StackTraceParserService } from "../stack-trace-parser/stack-trace-parser.service.mjs";

import type { LoggerServiceWriteInterface } from "../../definition/interface/logger-service-write.interface.mjs";

import type { LoggerInterface } from "../../definition/interface/logger.interface.mjs";

class LoggerService extends Singleton implements LoggerInterface
{
	protected dateFormat: string = "Y-m-d H:i:s";

	/**
	 * Write
	 */
	public write(content: LoggerServiceWriteInterface): void
	{
		const LEVEL: string = content.level.toUpperCase();
		const DATE: Time = new Time();
		const FORMATTED_DATE: string = DATE.format(this.dateFormat);
		let logLinePrefix: string = `[${FORMATTED_DATE}] [${LEVEL}]`;

		if (content.context !== undefined)
		{
			logLinePrefix += ` [${content.context}]`;
		}

		const LOG_LINE: string = `${logLinePrefix} - ${content.message}\n`;

		// eslint-disable-next-line no-console -- This is a logger, it should log to the console.
		console.log(LOG_LINE);
	}

	/**
	 * Debug
	 */
	public debug(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.DEBUG,
			message: message,
			context: context
		});
	}

	/**
	 * Informational
	 */
	public informational(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.INFO,
			message: message,
			context: context
		});
	}

	/**
	 * Info
	 */
	public info(message: string, context?: string): void
	{
		this.informational(message, context);
	}

	/**
	 * Notice
	 */
	public notice(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.NOTICE,
			message: message,
			context: context
		});
	}

	/**
	 * Warning
	 */
	public warning(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.WARNING,
			message: message,
			context: context
		});
	}

	/**
	 * Error
	 */
	public error(content: Error|string, context?: string): void
	{
		if (content instanceof Error)
		{
			this.logError(content);

			return;
		}

		this.write({
			level: LogLevelEnum.ERROR,
			message: content,
			context: context
		});
	}

	/**
	 * Critical
	 */
	public critical(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.CRITICAL,
			message: message,
			context: context
		});
	}

	/**
	 * Alert
	 */
	public alert(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.ALERT,
			message: message,
			context: context
		});
	}

	/**
	 * Emergency
	 */
	public emergency(message: string, context?: string): void
	{
		this.write({
			level: LogLevelEnum.EMERGENCY,
			message: message,
			context: context
		});
	}

	/**
	 * LogError
	 */
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
