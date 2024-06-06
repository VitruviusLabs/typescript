import type { LogContextInterface } from "./definition/interface/log-context.interface.mjs";
import type { LoggerInterface } from "./definition/interface/logger.interface.mjs";
import { ValidationError } from "@vitruvius-labs/ts-predicate";
import { stringifyErrorTree } from "@vitruvius-labs/ts-predicate/helper";
import { DateTime } from "@vitruvius-labs/toolbox";
import { Singleton } from "../../utility/singleton.mjs";
import { StackTraceUtility } from "../stack-trace/stack-trace.utility.mjs";

/**
 * Default logger service
 *
 * @internal
 */
class LoggerService extends Singleton implements LoggerInterface
{
	/**
	 * @privateRemarks
	 * Proxy to console.log for easier testing
	 */
	private static Write(message: string): void
	{
		// eslint-disable-next-line no-console -- This is a console logger, it should log to the console.
		console.log(message);
	}

	/**
	 * Logs a message
	 */
	public handleMessage(message: string, context: LogContextInterface): void
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
