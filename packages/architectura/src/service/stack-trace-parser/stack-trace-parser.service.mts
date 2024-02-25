import { NumericBaseEnum } from "../../definition/enum/numeric-base.enum.mjs";
import { StackTraceParserServiceEnum } from "./definition/enum/stack-trace-parser-service.enum.mjs";
import type { StackTraceLineParsingResultInterface } from "./definition/interface/stack-trace-line-parsing-result.interface.mjs";
import type { StackTraceParserLineAndPositionInterface } from "./definition/interface/stack-trace-parser-line-and-position.interface.mjs";
import type { TableColumnWidthsInterface } from "./definition/interface/table-column-widths.interface.mjs";

class StackTraceParserService
{
	private static readonly ErrorMessageRegExp: RegExp = /Error: (?<message>.*)/;
	private static readonly FileIndicatorRegExp: RegExp = /(?<file>(?:node:|file:\/\/)[^\n)]+)/;
	private static readonly LineAndPositionRegExp: RegExp = /:(?<line>[0-9]+):(?<position>[0-9]+)\)?/;
	private static readonly MethodColumnName: string = "Method";
	private static readonly LineColumnName: string = "Line";
	private static readonly PositionColumnName: string = "Position";
	private static readonly ModuleColumnName: string = "Module";
	private static readonly TableLineHorizontalSeparator: string = "─";
	private static readonly TableLineVerticalSeparator: string = "│";
	private static readonly TableLineCrossSeparator: string = "┼";
	private static readonly TableLineTopLeftSeparator: string = "┌";
	private static readonly TableLineTopRightSeparator: string = "┐";
	private static readonly TableLineBottomLeftSeparator: string = "└";
	private static readonly TableLineBottomRightSeparator: string = "┘";
	private static readonly TableLineTopSeparator: string = "┬";
	private static readonly TableLineBottomSeparator: string = "┴";
	private static readonly TableLineLeftSeparator: string = "├";
	private static readonly TableLineRightSeparator: string = "┤";

	private readonly error: Error;
	private readonly stackTrace: Array<string>;
	private readonly message: string = "";
	private readonly lines: Array<StackTraceLineParsingResultInterface> = [];

	public constructor(error: Error)
	{
		this.error = error;

		if (this.error.stack === undefined)
		{
			throw new Error("Error has no stack trace defined.");
		}

		this.stackTrace = this.error.stack.split("\n");
		this.message = this.error.message;

		while (this.stackTrace.length > 0)
		{
			const NEXT_LINE: StackTraceLineParsingResultInterface | undefined = this.parseNextLine();

			if (NEXT_LINE === undefined)
			{
				continue;
			}

			this.lines.push(NEXT_LINE);
		}
	}

	private static ExtractLineAndPosition(string: string): StackTraceParserLineAndPositionInterface
	{
		const LINE_AND_POSITION: RegExpExecArray | null = StackTraceParserService.LineAndPositionRegExp.exec(string);

		if (LINE_AND_POSITION === null)
		{
			return {
				line: StackTraceParserServiceEnum.LINE_NOT_FOUND_INDEX,
				position: StackTraceParserServiceEnum.POSITION_NOT_FOUND_INDEX,
			};
		}

		const FOUND_LINE: string | undefined = LINE_AND_POSITION.groups?.["line"];

		if (FOUND_LINE === undefined)
		{
			return {
				line: StackTraceParserServiceEnum.LINE_NOT_FOUND_INDEX,
				position: StackTraceParserServiceEnum.POSITION_NOT_FOUND_INDEX,
			};
		}

		const LINE: number = parseInt(FOUND_LINE, NumericBaseEnum.DECIMAL);
		const FOUND_POSITION: string | undefined = LINE_AND_POSITION.groups?.["position"];

		if (FOUND_POSITION === undefined)
		{
			return {
				line: LINE,
				position: StackTraceParserServiceEnum.POSITION_NOT_FOUND_INDEX,
			};
		}

		const POSITION: number = parseInt(FOUND_POSITION, NumericBaseEnum.DECIMAL);

		return {
			line: LINE,
			position: POSITION,
		};
	}

	private static GetPaddedString(string: string, length: number, align: "center" | "left" | "right" = "left"): string
	{
		if (align === "left")
		{
			return ` ${string}`.padEnd(length, " ");
		}

		if (align === "right")
		{
			return `${string} `.padStart(length, " ");
		}

		const STRING_PADDING: number = Math.floor((length - string.length) / StackTraceParserServiceEnum.COLUMN_PADDING);
		const LEFT_PADDED_STRING: string = string.padStart(STRING_PADDING + string.length, " ");
		const PADDED_STRING: string = LEFT_PADDED_STRING.padEnd(length, " ");

		return PADDED_STRING;
	}

	private static GetTableTopLine(table_column_widths: TableColumnWidthsInterface): string
	{
		const METHOD_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.method);
		const LINE_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.line);
		const POSITION_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.position);
		const MODULE_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.module);

		return `${StackTraceParserService.TableLineTopLeftSeparator}${METHOD_COLUMN_LINE}${StackTraceParserService.TableLineTopSeparator}${LINE_COLUMN_LINE}${StackTraceParserService.TableLineTopSeparator}${POSITION_COLUMN_LINE}${StackTraceParserService.TableLineTopSeparator}${MODULE_COLUMN_LINE}${StackTraceParserService.TableLineTopRightSeparator}`;
	}

	private static GetTableHeaderLine(table_column_widths: TableColumnWidthsInterface): string
	{
		const METHOD_HEADER: string = StackTraceParserService.GetPaddedString(StackTraceParserService.MethodColumnName, table_column_widths.method, "center");
		const LINE_HEADER: string = StackTraceParserService.GetPaddedString(StackTraceParserService.LineColumnName, table_column_widths.line, "center");
		const POSITION_HEADER: string = StackTraceParserService.GetPaddedString(StackTraceParserService.PositionColumnName, table_column_widths.position, "center");
		const MODULE_HEADER: string = StackTraceParserService.GetPaddedString(StackTraceParserService.ModuleColumnName, table_column_widths.module, "center");

		return `${StackTraceParserService.TableLineVerticalSeparator}${METHOD_HEADER}${StackTraceParserService.TableLineVerticalSeparator}${LINE_HEADER}${StackTraceParserService.TableLineVerticalSeparator}${POSITION_HEADER}${StackTraceParserService.TableLineVerticalSeparator}${MODULE_HEADER}${StackTraceParserService.TableLineVerticalSeparator}`;
	}

	private static GetTableSeparationLine(table_column_widths: TableColumnWidthsInterface): string
	{
		const METHOD_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.method);
		const LINE_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.line);
		const POSITION_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.position);
		const MODULE_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.module);

		return `${StackTraceParserService.TableLineLeftSeparator}${METHOD_COLUMN_LINE}${StackTraceParserService.TableLineCrossSeparator}${LINE_COLUMN_LINE}${StackTraceParserService.TableLineCrossSeparator}${POSITION_COLUMN_LINE}${StackTraceParserService.TableLineCrossSeparator}${MODULE_COLUMN_LINE}${StackTraceParserService.TableLineRightSeparator}`;
	}

	private static GetTableBottomLine(table_column_widths: TableColumnWidthsInterface): string
	{
		const METHOD_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.method);
		const LINE_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.line);
		const POSITION_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.position);
		const MODULE_COLUMN_LINE: string = StackTraceParserService.TableLineHorizontalSeparator.repeat(table_column_widths.module);

		return `${StackTraceParserService.TableLineBottomLeftSeparator}${METHOD_COLUMN_LINE}${StackTraceParserService.TableLineBottomSeparator}${LINE_COLUMN_LINE}${StackTraceParserService.TableLineBottomSeparator}${POSITION_COLUMN_LINE}${StackTraceParserService.TableLineBottomSeparator}${MODULE_COLUMN_LINE}${StackTraceParserService.TableLineBottomRightSeparator}`;
	}

	/**
	 * getMessage
	 */
	public getMessage(): string
	{
		return this.message;
	}

	/**
	 * getLines
	 */
	public getLines(): Array<StackTraceLineParsingResultInterface>
	{
		return this.lines;
	}

	public getStackTraceAsTable(): Array<string>
	{
		const TABLE_COLUMN_WIDTHS: TableColumnWidthsInterface = this.getTableColumnWidths();

		const TABLE: Array<string> = [];

		TABLE.push(StackTraceParserService.GetTableTopLine(TABLE_COLUMN_WIDTHS));
		TABLE.push(StackTraceParserService.GetTableHeaderLine(TABLE_COLUMN_WIDTHS));
		TABLE.push(StackTraceParserService.GetTableSeparationLine(TABLE_COLUMN_WIDTHS));

		for (const LINE of this.lines)
		{
			const METHOD_CONTENT: string = StackTraceParserService.GetPaddedString(LINE.method, TABLE_COLUMN_WIDTHS.method, "left");
			const LINE_NUMBER_CONTENT: string = StackTraceParserService.GetPaddedString(LINE.line.toString(), TABLE_COLUMN_WIDTHS.line, "right");
			const POSITION_CONTENT: string = StackTraceParserService.GetPaddedString(LINE.position.toString(), TABLE_COLUMN_WIDTHS.position, "right");
			const MODULE_CONTENT: string = StackTraceParserService.GetPaddedString(LINE.module, TABLE_COLUMN_WIDTHS.module, "left");

			TABLE.push(`${StackTraceParserService.TableLineVerticalSeparator}${METHOD_CONTENT}${StackTraceParserService.TableLineVerticalSeparator}${LINE_NUMBER_CONTENT}${StackTraceParserService.TableLineVerticalSeparator}${POSITION_CONTENT}${StackTraceParserService.TableLineVerticalSeparator}${MODULE_CONTENT}${StackTraceParserService.TableLineVerticalSeparator}`);
		}

		TABLE.push(StackTraceParserService.GetTableBottomLine(TABLE_COLUMN_WIDTHS));

		return TABLE;
	}

	private getLongestMethodLength(): number
	{
		let longest_method_length: number = StackTraceParserService.MethodColumnName.length;

		for (const LINE of this.lines)
		{
			const METHOD_LENGTH: number = LINE.method.length;

			if (METHOD_LENGTH > longest_method_length)
			{
				longest_method_length = METHOD_LENGTH;
			}
		}

		return longest_method_length;
	}

	private getLongestLineLength(): number
	{
		let longest_line_length: number = StackTraceParserService.LineColumnName.length;

		for (const LINE of this.lines)
		{
			const LINE_LENGTH: number = LINE.line.toString().length;

			if (LINE_LENGTH > longest_line_length)
			{
				longest_line_length = LINE_LENGTH;
			}
		}

		return longest_line_length;
	}

	private getLongestPositionLength(): number
	{
		let longest_position_length: number = StackTraceParserService.PositionColumnName.length;

		for (const LINE of this.lines)
		{
			const POSITION_LENGTH: number = LINE.position.toString().length;

			if (POSITION_LENGTH > longest_position_length)
			{
				longest_position_length = POSITION_LENGTH;
			}
		}

		return longest_position_length;
	}

	private getLongestModuleLength(): number
	{
		let longest_module_length: number = StackTraceParserService.ModuleColumnName.length;

		for (const LINE of this.lines)
		{
			const MODULE_LENGTH: number = LINE.module.length;

			if (MODULE_LENGTH > longest_module_length)
			{
				longest_module_length = MODULE_LENGTH;
			}
		}

		return longest_module_length;
	}

	private getTableColumnWidths(): TableColumnWidthsInterface
	{
		return {
			method: this.getLongestMethodLength() + StackTraceParserServiceEnum.COLUMN_PADDING,
			line: this.getLongestLineLength() + StackTraceParserServiceEnum.COLUMN_PADDING,
			position: this.getLongestModuleLength() + StackTraceParserServiceEnum.COLUMN_PADDING,
			module: this.getLongestPositionLength() + StackTraceParserServiceEnum.COLUMN_PADDING,
		};
	}

	private parseNextLine(): StackTraceLineParsingResultInterface | undefined
	{
		const NEXT_LINE: string | undefined = this.stackTrace.shift();

		if (NEXT_LINE === undefined)
		{
			return undefined;
		}

		if (StackTraceParserService.ErrorMessageRegExp.test(NEXT_LINE))
		{
			return undefined;
		}

		const TRIMMED_LINE: string = NEXT_LINE.trim();
		const CLEANED_LINE: string = TRIMMED_LINE.replace(/^at /, "");
		const FILE_INDICATOR: RegExpExecArray | null = StackTraceParserService.FileIndicatorRegExp.exec(CLEANED_LINE);
		const FILE_INDICATOR_CONTENT: string | undefined = FILE_INDICATOR?.groups?.["file"];
		const LINE_AND_POSITION: StackTraceParserLineAndPositionInterface = StackTraceParserService.ExtractLineAndPosition(FILE_INDICATOR_CONTENT ?? TRIMMED_LINE);
		const LINE_WITHOUT_FILE_INDICATOR: string = CLEANED_LINE.replace(StackTraceParserService.FileIndicatorRegExp, "");
		const LINE_WITHOUT_FILE_INDICATOR_AND_LINE_AND_POSITION: string = LINE_WITHOUT_FILE_INDICATOR.replace(StackTraceParserService.LineAndPositionRegExp, "");
		const METHOD: string = LINE_WITHOUT_FILE_INDICATOR_AND_LINE_AND_POSITION.replaceAll(/\(|\)/g, "").trim();
		const FOUND_MODULE: string = FILE_INDICATOR_CONTENT?.replace(/^\(/, "").replace(/\)$/, "")
			.replace(StackTraceParserService.LineAndPositionRegExp, "")
			.replace(/file:\/\//, "") ?? ">internal<";

		return {
			method: METHOD === "" ? ">anonymous<" : METHOD,
			line: LINE_AND_POSITION.line,
			position: LINE_AND_POSITION.position,
			module: FOUND_MODULE,
		};
	}
}

export { StackTraceParserService };
