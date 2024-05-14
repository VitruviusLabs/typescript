import type { LogContextInterface } from "./_index.mjs";
import type { LoggerInterface } from "./definition/interface/logger.interface.mjs";
import { ValidationError } from "@vitruvius-labs/ts-predicate";
import { stringifyErrorTree } from "@vitruvius-labs/ts-predicate/helper";
import { Singleton } from "../../utility/singleton.mjs";
import { StackTraceParserService } from "../stack-trace-parser/stack-trace-parser.service.mjs";
import { DateEnum } from "../../definition/enum/date.enum.mjs";

class LoggerService extends Singleton implements LoggerInterface
{
	public handleMessage(message: string, context: LogContextInterface): void
	{
		const LEVEL: string = context.level.toUpperCase();
		const DATE: Date = new Date();
		const FORMATTED_DATE: string = DATE.toISOString().slice(0, DateEnum.ISO_DATETIME_LENGTH).replace("T", " ");

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

		// eslint-disable-next-line no-console -- This is a console logger, it should log to the console.
		console.log(PREFIXED_MESSAGE);
	}

	public handleError(error: Error, context: LogContextInterface): void
	{
		const STACK_TRACE_PARSER: StackTraceParserService = new StackTraceParserService(error);
		const FORMATTED_STACK_TRACE: string = STACK_TRACE_PARSER.getStackTraceAsTable().join("\n");

		let message: string = "";

		if (error instanceof ValidationError)
		{
			message = stringifyErrorTree(error);
		}
		else
		{
			message = `${error.message}\n`;
		}

		message = `${message}${FORMATTED_STACK_TRACE}`;

		this.handleMessage(message, context);
	}
}

export { LoggerService };
