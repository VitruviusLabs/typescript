import type { CallFrameDetailsInterface } from "./definition/interface/call-frame-details.interface.mjs";
import type { LineAndPositionInterface } from "./definition/interface/line-and-position.interface.mjs";
import type { TableColumnWidthsInterface } from "./definition/interface/table-column-widths.interface.mjs";
import { NumericBaseEnum } from "../../definition/enum/numeric-base.enum.mjs";
import { StackTraceParsingConstantEnum } from "./definition/enum/stack-trace-parsing-constant.enum.mjs";
import { PrettyTableEnum } from "./definition/enum/pretty-table.enum.mjs";
import { ColumnLabelEnum } from "./definition/enum/column-label.enum.mjs";
import { TextAlignEnum } from "./definition/enum/text-align.enum.mjs";

/**
 * Service to process Error stack traces
 */
class StackTraceService
{
	private static readonly ErrorMessageRegExp: RegExp = /Error: (?<message>.*)/;
	private static readonly FileIndicatorRegExp: RegExp = /(?<file>(?:node:|file:\/\/)[^\n)]+)/;
	private static readonly LineAndPositionRegExp: RegExp = /:(?<line>[0-9]+):(?<position>[0-9]+)\)?/;

	private readonly error: Error;
	private readonly message: string = "";
	private readonly callFrames: Array<CallFrameDetailsInterface> = [];

	/**
	 * Create a new wrapper for a specific error
	 */
	public constructor(error: Error)
	{
		this.error = error;

		if (this.error.stack === undefined)
		{
			throw new Error("Error has no stack trace defined.");
		}

		this.message = this.error.message;

		const STACK_TRACE: Array<string> = this.error.stack.trim().split("\n");

		for (const LINE of STACK_TRACE)
		{
			const CALL_FRAME: CallFrameDetailsInterface | undefined = StackTraceService.ParseLine(LINE);

			if (CALL_FRAME === undefined)
			{
				continue;
			}

			this.callFrames.push(CALL_FRAME);
		}
	}

	private static ParseLine(line: string): CallFrameDetailsInterface | undefined
	{
		const TRIMMED_LINE: string = line.trim();

		if (TRIMMED_LINE === "")
		{
			return undefined;
		}

		if (StackTraceService.ErrorMessageRegExp.test(TRIMMED_LINE))
		{
			return undefined;
		}

		const CLEANED_LINE: string = TRIMMED_LINE.replace(/^at /, "");
		const FILE_INDICATOR: RegExpExecArray | null = StackTraceService.FileIndicatorRegExp.exec(CLEANED_LINE);
		const FILE_INDICATOR_CONTENT: string | undefined = FILE_INDICATOR?.groups?.["file"];
		const LINE_AND_POSITION: LineAndPositionInterface = StackTraceService.ExtractLineAndPosition(FILE_INDICATOR_CONTENT ?? TRIMMED_LINE);
		const LINE_WITHOUT_FILE_INDICATOR: string = CLEANED_LINE.replace(StackTraceService.FileIndicatorRegExp, "");
		const LINE_WITHOUT_FILE_INDICATOR_AND_LINE_AND_POSITION: string = LINE_WITHOUT_FILE_INDICATOR.replace(StackTraceService.LineAndPositionRegExp, "");
		const METHOD: string = LINE_WITHOUT_FILE_INDICATOR_AND_LINE_AND_POSITION.replaceAll("(", "").replaceAll(")", "").trim();
		const FOUND_MODULE: string = StackTraceService.ExtractModule(FILE_INDICATOR_CONTENT);

		return {
			method: METHOD === "" ? StackTraceParsingConstantEnum.UNKNOWN_METHOD : METHOD,
			line: LINE_AND_POSITION.line,
			position: LINE_AND_POSITION.position,
			module: FOUND_MODULE,
		};
	}

	private static ExtractLineAndPosition(string: string): LineAndPositionInterface
	{
		const NOT_FOUND_INDEX: number = -1;

		const LINE_AND_POSITION: LineAndPositionInterface = {
			line: NOT_FOUND_INDEX,
			position: NOT_FOUND_INDEX,
		};

		const MATCH: RegExpExecArray | null = StackTraceService.LineAndPositionRegExp.exec(string);

		if (MATCH === null)
		{
			return LINE_AND_POSITION;
		}

		const FOUND_LINE: string | undefined = MATCH.groups?.["line"];
		const FOUND_POSITION: string | undefined = MATCH.groups?.["position"];

		if (FOUND_LINE === undefined)
		{
			return LINE_AND_POSITION;
		}

		LINE_AND_POSITION.line = parseInt(FOUND_LINE, NumericBaseEnum.DECIMAL);

		if (FOUND_POSITION === undefined)
		{
			return LINE_AND_POSITION;
		}

		LINE_AND_POSITION.position = parseInt(FOUND_POSITION, NumericBaseEnum.DECIMAL);

		return LINE_AND_POSITION;
	}

	private static ExtractModule(file_indicator_content: string | undefined): string
	{
		if (file_indicator_content === undefined)
		{
			return StackTraceParsingConstantEnum.UNKNOWN_MODULE;
		}

		return file_indicator_content
			.replace(/^\(/, "")
			.replace(/\)$/, "")
			.replace(StackTraceService.LineAndPositionRegExp, "")
			.replace("file://", "");
	}

	private static GetPaddedString(text: string, length: number, align: TextAlignEnum): string
	{
		if (align === TextAlignEnum.LEFT)
		{
			return text.padEnd(length, " ");
		}

		if (align === TextAlignEnum.RIGHT)
		{
			return text.padStart(length, " ");
		}

		const CENTER_PADDING_DIVISION: number = 2;
		const STRING_PADDING: number = Math.floor((length - text.length) / CENTER_PADDING_DIVISION);
		const LEFT_PADDED_STRING: string = text.padStart(STRING_PADDING + text.length, " ");
		const PADDED_STRING: string = LEFT_PADDED_STRING.padEnd(length, " ");

		return PADDED_STRING;
	}

	private static GetTableTopLine(table_column_widths: TableColumnWidthsInterface): string
	{
		return [
			PrettyTableEnum.TOP_LEFT,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.method),
			PrettyTableEnum.TOP,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.line),
			PrettyTableEnum.TOP,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.position),
			PrettyTableEnum.TOP,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.module),
			PrettyTableEnum.TOP_RIGHT,
		].join("");
	}

	private static GetTableHeaderLine(table_column_widths: TableColumnWidthsInterface): string
	{
		return [
			PrettyTableEnum.VERTICAL,
			StackTraceService.GetPaddedString(ColumnLabelEnum.METHOD, table_column_widths.method, TextAlignEnum.CENTER),
			PrettyTableEnum.VERTICAL,
			StackTraceService.GetPaddedString(ColumnLabelEnum.LINE, table_column_widths.line, TextAlignEnum.CENTER),
			PrettyTableEnum.VERTICAL,
			StackTraceService.GetPaddedString(ColumnLabelEnum.POSITION, table_column_widths.position, TextAlignEnum.CENTER),
			PrettyTableEnum.VERTICAL,
			StackTraceService.GetPaddedString(ColumnLabelEnum.MODULE, table_column_widths.module, TextAlignEnum.CENTER),
			PrettyTableEnum.VERTICAL,
		].join("");
	}

	private static GetTableSeparationLine(table_column_widths: TableColumnWidthsInterface): string
	{
		return [
			PrettyTableEnum.LEFT,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.method),
			PrettyTableEnum.CROSS,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.line),
			PrettyTableEnum.CROSS,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.position),
			PrettyTableEnum.CROSS,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.module),
			PrettyTableEnum.RIGHT,
		].join("");
	}

	private static GetTableBottomLine(table_column_widths: TableColumnWidthsInterface): string
	{
		return [
			PrettyTableEnum.BOTTOM_LEFT,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.method),
			PrettyTableEnum.BOTTOM,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.line),
			PrettyTableEnum.BOTTOM,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.position),
			PrettyTableEnum.BOTTOM,
			PrettyTableEnum.HORIZONTAL.repeat(table_column_widths.module),
			PrettyTableEnum.BOTTOM_RIGHT,
		].join("");
	}

	private static GetTableLine(call_frame: CallFrameDetailsInterface, table_column_widths: TableColumnWidthsInterface): string
	{
		return [
			PrettyTableEnum.VERTICAL,
			StackTraceService.GetPaddedString(call_frame.method, table_column_widths.method, TextAlignEnum.LEFT),
			PrettyTableEnum.VERTICAL,
			StackTraceService.GetPaddedString(call_frame.line.toString(), table_column_widths.line, TextAlignEnum.RIGHT),
			PrettyTableEnum.VERTICAL,
			StackTraceService.GetPaddedString(call_frame.position.toString(), table_column_widths.position, TextAlignEnum.RIGHT),
			PrettyTableEnum.VERTICAL,
			StackTraceService.GetPaddedString(call_frame.module, table_column_widths.module, TextAlignEnum.LEFT),
			PrettyTableEnum.VERTICAL,
		].join("");
	}

	/**
	 * Get the error message
	 */
	public getMessage(): string
	{
		return this.message;
	}

	/**
	 * Get the call stack as a JSON serializable array
	 */
	public getSerializableTrace(): Array<CallFrameDetailsInterface>
	{
		return this.callFrames;
	}

	/**
	 * Get the call stack as a pretty formatted string
	 */
	public getPrettyPrintableTrace(): string
	{
		const TABLE_COLUMN_WIDTHS: TableColumnWidthsInterface = this.getTableColumnWidths();

		const TABLE: Array<string> = [];

		TABLE.push(StackTraceService.GetTableTopLine(TABLE_COLUMN_WIDTHS));
		TABLE.push(StackTraceService.GetTableHeaderLine(TABLE_COLUMN_WIDTHS));
		TABLE.push(StackTraceService.GetTableSeparationLine(TABLE_COLUMN_WIDTHS));

		for (const CALL_FRAME of this.callFrames)
		{
			TABLE.push(StackTraceService.GetTableLine(CALL_FRAME, TABLE_COLUMN_WIDTHS));
		}

		TABLE.push(StackTraceService.GetTableBottomLine(TABLE_COLUMN_WIDTHS));

		return TABLE.join("\n");
	}

	private getTableColumnWidths(): TableColumnWidthsInterface
	{
		return {
			method: this.getLongestMethodLength(),
			line: this.getLongestLineLength(),
			position: this.getLongestPositionLength(),
			module: this.getLongestModuleLength(),
		};
	}

	private getLongestMethodLength(): number
	{
		return this.getLongestLength(ColumnLabelEnum.METHOD, "method");
	}

	private getLongestLineLength(): number
	{
		return this.getLongestLength(ColumnLabelEnum.LINE, "line");
	}

	private getLongestPositionLength(): number
	{
		return this.getLongestLength(ColumnLabelEnum.POSITION, "position");
	}

	private getLongestModuleLength(): number
	{
		return this.getLongestLength(ColumnLabelEnum.MODULE, "module");
	}

	private getLongestLength(column_name: string, key: keyof CallFrameDetailsInterface): number
	{
		const COLUMN_PADDING: number = 2;

		return COLUMN_PADDING + this.callFrames.reduce(
			(longest_length: number, call_frame: CallFrameDetailsInterface): number =>
			{
				return Math.max(longest_length, call_frame[key].toString().length);
			},
			column_name.length
		);
	}
}

export { StackTraceService };
