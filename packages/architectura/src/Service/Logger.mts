import { Time } from "../Core/Time.mjs";

import { LogLevelEnum } from "./Logger/LogLevelEnum.mjs";

import { StackTraceParser } from "./Logger/StackTraceParser.mjs";

class Logger
{
	/**
	 * Write
	 */
	public static Write(level: LogLevelEnum, message: string): void
	{
		const LEVEL: string = level.toUpperCase();
		const DATE: Time = new Time();
		const FORMATTED_DATE: string = DATE.format("Y-m-d H:i:s");
		const LOG_LINE: string = `[${FORMATTED_DATE}] [${LEVEL}] - ${message}\n`;

		// eslint-disable-next-line no-console -- This is a logger, it should log to the console.
		console.log(LOG_LINE);
	}

	/**
	 * LogError
	 */
	public static LogError(error: unknown): void
	{
		if (!(error instanceof Error))
		{
			throw new Error("Logger.logError can only handle Error and it's derivates.");
		}

		const STACK_TRACE_PARSER: StackTraceParser = new StackTraceParser(error);
		const FORMATTED_STACK_TRACE: Array<string> = STACK_TRACE_PARSER.getStackTraceAsTable();

		for (const LINE of FORMATTED_STACK_TRACE)
		{
			this.Error(LINE);
		}
	}

	/**
	 * Debug
	 */
	public static Debug(message: string): void
	{
		this.Write(LogLevelEnum.DEBUG, message);
	}

	/**
	 * Informational
	 */
	public static Informational(message: string): void
	{
		this.Write(LogLevelEnum.INFO, message);
	}

	/**
	 * Info
	 */
	public static Info(message: string): void
	{
		this.Informational(message);
	}

	/**
	 * Notice
	 */
	public static Notice(message: string): void
	{
		this.Write(LogLevelEnum.NOTICE, message);
	}

	/**
	 * Warning
	 */
	public static Warning(message: string): void
	{
		this.Write(LogLevelEnum.WARNING, message);
	}

	/**
	 * Error
	 */
	public static Error(message: string): void
	{
		this.Write(LogLevelEnum.ERROR, message);
	}

	/**
	 * Critical
	 */
	public static Critical(message: string): void
	{
		this.Write(LogLevelEnum.CRITICAL, message);
	}

	/**
	 * Alert
	 */
	public static Alert(message: string): void
	{
		this.Write(LogLevelEnum.ALERT, message);
	}

	/**
	 * Emergency
	 */
	public static Emergency(message: string): void
	{
		this.Write(LogLevelEnum.EMERGENCY, message);
	}
}

export { Logger };
