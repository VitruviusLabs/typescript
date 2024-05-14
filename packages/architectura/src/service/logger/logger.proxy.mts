import type { LoggerInterface } from "./definition/interface/logger.interface.mjs";
import type { LogContextInterface } from "./definition/interface/log-context.interface.mjs";
import { toError } from "@vitruvius-labs/ts-predicate/helper";
import { LoggerService } from "./logger.service.mjs";
import { isString } from "@vitruvius-labs/ts-predicate/type-guard";
import { ExecutionContextRegistry } from "../../core/execution-context/execution-context.registry.mjs";
import { LogLevelEnum } from "./definition/enum/log-level.enum.mjs";
import { Server } from "../../core/server/server.mjs";

class LoggerProxy
{
	private static Initialised: boolean = false;
	private static Logger: LoggerInterface = new LoggerService();

	public static Initialise(logger_service: LoggerInterface): void
	{
		if (LoggerProxy.Initialised)
		{
			return;
		}

		LoggerProxy.Logger = logger_service;

		LoggerProxy.Initialised = true;
	}

	public static Debug(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.DEBUG, tag);
	}

	public static Informational(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.INFO, tag);
	}

	public static Info(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.INFO, tag);
	}

	public static Notice(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.NOTICE, tag);
	}

	public static Warning(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.WARNING, tag);
	}

	public static Error(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.ERROR, tag);
	}

	public static Critical(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.CRITICAL, tag);
	}

	public static Alert(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.ALERT, tag);
	}

	public static Emergency(message: unknown, tag?: string): void
	{
		LoggerProxy.Process(message, LogLevelEnum.EMERGENCY, tag);
	}

	private static Process(message: unknown, level: LogLevelEnum, tag: string | undefined): void
	{
		const UUID: string | undefined = ExecutionContextRegistry.GetUnsafeExecutionContext()?.getUUID();

		const CONTEXT: LogContextInterface = {
			level: level,
			uuid: UUID,
			tag: tag,
		};

		let promise: Promise<void> | void = undefined;

		if (isString(message))
		{
			promise = LoggerProxy.Logger.handleMessage(message, CONTEXT);

			return;
		}

		promise = LoggerProxy.Logger.handleError(toError(message), CONTEXT);

		if (!(promise instanceof Promise))
		{
			return;
		}

		promise.catch(
			(reason: Error): void =>
			{
				Server.HandleError(reason).catch((): void => { /* Do nothing */ });
			}
		);
	}
}

export { LoggerProxy };
