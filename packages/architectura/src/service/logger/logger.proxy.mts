import { toError } from "@vitruvius-labs/ts-predicate/helper";
import type { LoggerInterface } from "./definition/interface/logger.interface.mjs";
import { LoggerService } from "./logger.service.mjs";
import { isString } from "@vitruvius-labs/ts-predicate/type-guard";

class LoggerProxy
{
	protected static Initialised: boolean = false;

	protected static Logger: LoggerInterface = new LoggerService();

	public static Initialise(loggerService: LoggerInterface): void
	{
		if (this.Initialised)
		{
			return;
		}

		this.Logger = loggerService;

		this.Initialised = true;
	}

	public static Debug(message: string, context?: string): void
	{
		this.Logger.debug(message, context);
	}

	public static Informational(message: string, context?: string): void
	{
		this.Logger.informational(message, context);
	}

	public static Info(message: string, context?: string): void
	{
		this.Logger.info(message, context);
	}

	public static Notice(message: string, context?: string): void
	{
		this.Logger.notice(message, context);
	}

	public static Warning(message: string, context?: string): void
	{
		this.Logger.warning(message, context);
	}

	public static Error(message: unknown, context?: string): void
	{
		const NORMALIZED_ERROR: Error | string = isString(message) ? message : toError(message);

		this.Logger.error(NORMALIZED_ERROR, context);
	}

	public static Critical(message: string, context?: string): void
	{
		this.Logger.critical(message, context);
	}

	public static Alert(message: string, context?: string): void
	{
		this.Logger.alert(message, context);
	}

	public static Emergency(message: string, context?: string): void
	{
		this.Logger.emergency(message, context);
	}
}

export { LoggerProxy };
