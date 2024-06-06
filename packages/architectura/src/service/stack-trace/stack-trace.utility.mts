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
 *
 * @sealed
 */
class StackTraceUtility
{
	private static readonly ERROR_MESSAGE_REGEXP: RegExp = /Error: (?<message>.*)/;
	private static readonly FILE_INDICATOR_REGEXP: RegExp = /(?<file>(?:node:|file:\/\/)[^\n)]+)/;
	private static readonly LINE_AND_POSITION_REGEXP: RegExp = /:(?<line>[0-9]+):(?<position>[0-9]+)\)?/;

	/**
	 * Get the call stack as a JSON serializable array
	 */
	public static GetSerializableTrace(error: Error): Array<CallFrameDetailsInterface>
	{
		const CALL_FRAMES: Array<CallFrameDetailsInterface> = [];

		const STACK_TRACE: string = (error.stack ?? "").trim();

		if (STACK_TRACE === "")
		{
			return [];
		}

		const LINES: Array<string> = STACK_TRACE.split("\n");

		for (const LINE of LINES)
		{
			const CALL_FRAME: CallFrameDetailsInterface | undefined = StackTraceUtility.ParseLine(LINE);

			if (CALL_FRAME === undefined)
			{
				continue;
			}

			CALL_FRAMES.push(CALL_FRAME);
		}

		return CALL_FRAMES;
	}

	/**
	 * Get the call stack as a pretty formatted string
	 */
	public static GetPrettyPrintableTrace(error: Error): string
	{
		const CALL_FRAMES: Array<CallFrameDetailsInterface> = StackTraceUtility.GetSerializableTrace(error);

		if (CALL_FRAMES.length === 0)
		{
			return "";
		}

		const TABLE_COLUMN_WIDTHS: TableColumnWidthsInterface = StackTraceUtility.GetTableColumnWidths(CALL_FRAMES);

		const TABLE: Array<string> = [];

		TABLE.push(StackTraceUtility.GetTableTopLine(TABLE_COLUMN_WIDTHS));
		TABLE.push(StackTraceUtility.GetTableHeaderLine(TABLE_COLUMN_WIDTHS));
		TABLE.push(StackTraceUtility.GetTableSeparationLine(TABLE_COLUMN_WIDTHS));

		for (const CALL_FRAME of CALL_FRAMES)
		{
			TABLE.push(StackTraceUtility.GetTableLine(CALL_FRAME, TABLE_COLUMN_WIDTHS));
		}

		TABLE.push(StackTraceUtility.GetTableBottomLine(TABLE_COLUMN_WIDTHS));

		return TABLE.join("\n");
	}

	private static ParseLine(line: string): CallFrameDetailsInterface | undefined
	{
		const TRIMMED_LINE: string = line.trim();

		if (TRIMMED_LINE === "")
		{
			return undefined;
		}

		if (StackTraceUtility.ERROR_MESSAGE_REGEXP.test(TRIMMED_LINE))
		{
			return undefined;
		}

		const CLEANED_LINE: string = TRIMMED_LINE.replace(/^at /, "");
		const FILE_INDICATOR: RegExpExecArray | null = StackTraceUtility.FILE_INDICATOR_REGEXP.exec(CLEANED_LINE);
		const FILE_INDICATOR_CONTENT: string | undefined = FILE_INDICATOR?.groups?.["file"];
		const LINE_AND_POSITION: LineAndPositionInterface = StackTraceUtility.ExtractLineAndPosition(FILE_INDICATOR_CONTENT ?? TRIMMED_LINE);
		const LINE_WITHOUT_FILE_INDICATOR: string = CLEANED_LINE.replace(StackTraceUtility.FILE_INDICATOR_REGEXP, "");
		const LINE_WITHOUT_FILE_INDICATOR_AND_LINE_AND_POSITION: string = LINE_WITHOUT_FILE_INDICATOR.replace(StackTraceUtility.LINE_AND_POSITION_REGEXP, "");
		const METHOD: string = StackTraceUtility.ExtractMethod(LINE_WITHOUT_FILE_INDICATOR_AND_LINE_AND_POSITION);
		const FOUND_MODULE: string = StackTraceUtility.ExtractModule(FILE_INDICATOR_CONTENT);

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

		const MATCH: RegExpExecArray | null = StackTraceUtility.LINE_AND_POSITION_REGEXP.exec(string);

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

	private static ExtractMethod(line_without_file_indicator_and_line_and_position: string): string
	{
		return line_without_file_indicator_and_line_and_position
			.replaceAll("(", "")
			.replaceAll(")", "")
			.trim()
			.replace("async ", "");
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
			.replace(StackTraceUtility.LINE_AND_POSITION_REGEXP, "")
			.replace("file://", "");
	}

	private static GetPaddedString(value: number | string, length: number, align: TextAlignEnum): string
	{
		const TEXT: string = ` ${value.toString()} `;

		if (align === TextAlignEnum.LEFT)
		{
			return TEXT.padEnd(length, " ");
		}

		if (align === TextAlignEnum.RIGHT)
		{
			return TEXT.padStart(length, " ");
		}

		const CENTER_PADDING_DIVISION: number = 2;
		const STRING_PADDING: number = Math.floor((length - TEXT.length) / CENTER_PADDING_DIVISION);
		const LEFT_PADDED_STRING: string = TEXT.padStart(STRING_PADDING + TEXT.length, " ");
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
			StackTraceUtility.GetPaddedString(ColumnLabelEnum.METHOD, table_column_widths.method, TextAlignEnum.CENTER),
			PrettyTableEnum.VERTICAL,
			StackTraceUtility.GetPaddedString(ColumnLabelEnum.LINE, table_column_widths.line, TextAlignEnum.CENTER),
			PrettyTableEnum.VERTICAL,
			StackTraceUtility.GetPaddedString(ColumnLabelEnum.POSITION, table_column_widths.position, TextAlignEnum.CENTER),
			PrettyTableEnum.VERTICAL,
			StackTraceUtility.GetPaddedString(ColumnLabelEnum.MODULE, table_column_widths.module, TextAlignEnum.CENTER),
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
			StackTraceUtility.GetPaddedString(call_frame.method, table_column_widths.method, TextAlignEnum.LEFT),
			PrettyTableEnum.VERTICAL,
			StackTraceUtility.GetPaddedString(call_frame.line, table_column_widths.line, TextAlignEnum.RIGHT),
			PrettyTableEnum.VERTICAL,
			StackTraceUtility.GetPaddedString(call_frame.position, table_column_widths.position, TextAlignEnum.RIGHT),
			PrettyTableEnum.VERTICAL,
			StackTraceUtility.GetPaddedString(call_frame.module, table_column_widths.module, TextAlignEnum.LEFT),
			PrettyTableEnum.VERTICAL,
		].join("");
	}

	private static GetTableColumnWidths(call_frames: Array<CallFrameDetailsInterface>): TableColumnWidthsInterface
	{
		return {
			method: StackTraceUtility.GetLongestLength(call_frames, ColumnLabelEnum.METHOD, "method"),
			line: StackTraceUtility.GetLongestLength(call_frames, ColumnLabelEnum.LINE, "line"),
			position: StackTraceUtility.GetLongestLength(call_frames, ColumnLabelEnum.POSITION, "position"),
			module: StackTraceUtility.GetLongestLength(call_frames, ColumnLabelEnum.MODULE, "module"),
		};
	}

	private static GetLongestLength(call_frames: Array<CallFrameDetailsInterface>, column_name: string, key: keyof CallFrameDetailsInterface): number
	{
		const COLUMN_PADDING: number = 2;

		return COLUMN_PADDING + call_frames.reduce(
			(longest_length: number, call_frame: CallFrameDetailsInterface): number =>
			{
				return Math.max(longest_length, call_frame[key].toString().length);
			},
			column_name.length
		);
	}
}

export { StackTraceUtility };
