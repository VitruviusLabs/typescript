import type { LoggerInterface } from "./definition/interface/logger.interface.mjs";
import type { LoggerService } from "./logger.service.mjs";

class LoggerProxy
{
	protected static Initialised: boolean = false;

	protected static Logger: LoggerInterface;

	public static Initialise(loggerService: LoggerService): void
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

	public static Error(message: Error | string, context?: string): void
	{
		this.Logger.error(message, context);
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
