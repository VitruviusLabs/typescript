import type { LoggerInterface } from "./definition/interface/logger.interface.mjs";
import type { LogContextInterface } from "./definition/interface/log-context.interface.mjs";
import { toError } from "@vitruvius-labs/ts-predicate/helper";
import { isString } from "@vitruvius-labs/ts-predicate/type-guard";
import { LoggerService } from "./logger.service.mjs";
import { ExecutionContextRegistry } from "../../core/execution-context/execution-context.registry.mjs";
import { LogLevelEnum } from "./definition/enum/log-level.enum.mjs";
import { Server } from "../../core/server/server.mjs";

/**
 * Proxy for the logger service
 *
 * @sealed
 */
class LoggerProxy
{
	private static Initialised: boolean = false;
	private static Logger: LoggerInterface = new LoggerService();

	/**
	 * Initialises the logger proxy with a custom logger
	 *
	 * @remarks
	 * Unless called, it writes to the console
	 * Ignore subsequent calls.
	 */
	public static Initialise(logger_service: LoggerInterface): void
	{
		if (LoggerProxy.Initialised)
		{
			return;
		}

		LoggerProxy.Logger = logger_service;

		LoggerProxy.Initialised = true;
	}

	/**
	 * Logs a debug message
	 */
	public static Debug(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.DEBUG, tag);
	}

	/**
	 * Logs an informational message
	 */
	public static Informational(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.INFO, tag);
	}

	/**
	 * Logs an informational message
	 */
	public static Info(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.INFO, tag);
	}

	/**
	 * Logs a notice message
	 */
	public static Notice(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.NOTICE, tag);
	}

	/**
	 * Logs a warning message
	 */
	public static Warning(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.WARNING, tag);
	}

	/**
	 * Logs an error message
	 */
	public static Error(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.ERROR, tag);
	}

	/**
	 * Logs a critical message
	 */
	public static Critical(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.CRITICAL, tag);
	}

	/**
	 * Logs an alert message
	 */
	public static Alert(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.ALERT, tag);
	}

	/**
	 * Logs an emergency message
	 */
	public static Emergency(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.EMERGENCY, tag);
	}

	// @ts-expect-error: Returns void to not interrupt the flow
	private static async Process(message: unknown, level: LogLevelEnum, tag: string | undefined): void
	{
		try
		{
			const UUID: string | undefined = ExecutionContextRegistry.GetUnsafeExecutionContext()?.getUUID();

			const CONTEXT: LogContextInterface = {
				level: level,
				uuid: UUID,
				tag: tag,
			};

			if (isString(message))
			{
				await LoggerProxy.Logger.handleMessage(message, CONTEXT);

				return;
			}

			await LoggerProxy.Logger.handleError(toError(message), CONTEXT);
		}
		catch (error: unknown)
		{
			await Server.HandleError(error);
		}
	}
}

export { LoggerProxy };
