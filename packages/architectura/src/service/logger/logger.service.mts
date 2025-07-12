import type { LogContextInterface } from "./definition/interface/log-context.interface.mjs";
import type { LoggerInterface } from "./definition/interface/logger.interface.mjs";
import { ValidationError } from "@vitruvius-labs/ts-predicate";
import { stringifyErrorTree } from "@vitruvius-labs/ts-predicate/helper";
import { DateTime } from "@vitruvius-labs/toolbox";
import { Singleton } from "../../utility/singleton.mjs";
import { StackTraceUtility } from "../stack-trace/stack-trace.utility.mjs";
import { LoggerServiceOutputFormatEnum } from "./definition/enum/logger-service-output-format.enum.mjs";
import type { LoggerServiceInstantiationInterface } from "./definition/interface/logger-service-instantiation.interface.mjs";
import type { LoggerServiceJSONMessageInterface } from "./definition/interface/logger-service-json-message.interface.mjs";

/**
 * Default logger service
 *
 * @internal
 */
class LoggerService extends Singleton implements LoggerInterface
{
	protected outputFormat: LoggerServiceOutputFormatEnum = LoggerServiceOutputFormatEnum.PLAIN;

	public constructor(parameters?: LoggerServiceInstantiationInterface)
	{
		super();

		if (parameters === undefined)
		{
			return;
		}

		if (parameters.outputFormat !== undefined)
		{
			this.outputFormat = parameters.outputFormat;
		}
	}

	/**
	 * @privateRemarks
	 * Proxy to console.log for easier testing
	 */
	private static Write(message: string): void
	{
		// eslint-disable-next-line no-console -- This is a console logger, it should log to the console.
		console.log(message);
	}

	public setOutputFormat(value: LoggerServiceOutputFormatEnum): void
	{
		this.outputFormat = value;
	}

	public handleMessage(message: string, context: LogContextInterface): void
	{
		if (this.outputFormat === LoggerServiceOutputFormatEnum.PLAIN)
		{
			this.handlePlainMessage(message, context);

			return;
		}

		this.handleJSONMessage(message, context);
	}

	/**
	 * Logs a message
	 */
	public handlePlainMessage(message: string, context: LogContextInterface): void
	{
		const LEVEL: string = context.level.toUpperCase();
		const FORMATTED_DATE: string = DateTime.Create().getISODateTime();

		let prefix: string = `[${FORMATTED_DATE}] [${LEVEL}]`;

		if (context.uuid !== undefined)
		{
			prefix = `${prefix} {${context.uuid}}`;
		}

		if (context.tag !== undefined)
		{
			prefix = `${prefix} [${context.tag}]`;
		}

		const PREFIXED_MESSAGE: string = message
			.trimEnd()
			.split("\n")
			.map(
				(message_line: string): string =>
				{
					return `${prefix} - ${message_line}`;
				}
			)
			.join("\n");

		LoggerService.Write(PREFIXED_MESSAGE);
	}

	/**
	 * Logs a message
	 */
	public handleJSONMessage(message: string, context: LogContextInterface): void
	{
		const DATE: DateTime = DateTime.Create();
		const JSON_MESSAGE: LoggerServiceJSONMessageInterface = {
			level: context.level.toUpperCase(),
			timestamp: DATE.getTime(),
			logDate: DATE.getISODateTime(),
			message: message,
			requestUUID: context.uuid ?? null,
			contextTag: context.tag ?? null,
		};

		const OUTPUT_MESSAGE: string = JSON.stringify(JSON_MESSAGE);

		LoggerService.Write(OUTPUT_MESSAGE);
	}

	/**
	 * Logs an error
	 */
	public handleError(error: Error, context: LogContextInterface): void
	{
		const FORMATTED_STACK_TRACE: string = StackTraceUtility.GetPrettyPrintableTrace(error);

		let message: string = "";

		if (error instanceof ValidationError)
		{
			message = stringifyErrorTree(error);
		}
		else
		{
			message = `${error.message}\n`;
		}

		message = `${message}${FORMATTED_STACK_TRACE}`.trimEnd();

		this.handleMessage(message, context);
	}
}

export { LoggerService };
