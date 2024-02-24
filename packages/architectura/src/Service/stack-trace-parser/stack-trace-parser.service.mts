import { StackTraceParserEnum } from "../Logger/StackTraceParser/StackTraceParserEnum.mjs";

import { NumericBaseEnum } from "../Number/NumericBaseEnum.mjs";


import type { StackTraceLineParsingResultInterface } from "../Logger/StackTraceParser/StackTraceLineParsingResultInterface.js";

import type { StackTraceParserLineAndPositionInterface } from "../Logger/StackTraceParser/StackTraceParserLineAndPositionInterface.mjs";

class StackTraceParser
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
        const LINE_AND_POSITION: RegExpExecArray | null = StackTraceParser.LineAndPositionRegExp.exec(string);

        if (LINE_AND_POSITION === null)
        {
            return {
                line: StackTraceParserEnum.LINE_NOT_FOUND_INDEX,
                position: StackTraceParserEnum.POSITION_NOT_FOUND_INDEX
            };
        }

        const FOUND_LINE: string | undefined = LINE_AND_POSITION.groups?.['line'];

        if (FOUND_LINE === undefined)
        {
            return {
                line: StackTraceParserEnum.LINE_NOT_FOUND_INDEX,
                position: StackTraceParserEnum.POSITION_NOT_FOUND_INDEX
            };
        }

        const LINE: number = parseInt(FOUND_LINE, NumericBaseEnum.DECIMAL);
        const FOUND_POSITION: string | undefined = LINE_AND_POSITION.groups?.['position'];

        if (FOUND_POSITION === undefined)
        {
            return {
                line: LINE,
                position: StackTraceParserEnum.POSITION_NOT_FOUND_INDEX
            };
        }

        const POSITION: number = parseInt(FOUND_POSITION, NumericBaseEnum.DECIMAL);

        return {
            line: LINE,
            position: POSITION
        };
    }

    private static GetPaddedString(string: string, length: number, align: 'center' | 'left' | 'right' = 'left'): string
    {
        if (align === 'left')
        {
            return ` ${string}`.padEnd(length, " ");
        }

        if (align === 'right')
        {
            return `${string} `.padStart(length, " ");
        }

        const STRING_PADDING: number = Math.floor((length - string.length) / StackTraceParserEnum.COLUMN_PADDING);
        const LEFT_PADDED_STRING: string = string.padStart(STRING_PADDING + string.length, " ");
        const PADDED_STRING: string = LEFT_PADDED_STRING.padEnd(length, " ");

        return PADDED_STRING;
    }

    private static GetTableTopLine(method_column_length: number, line_column_length: number, position_column_length: number, module_column_length: number): string
    {
        const METHOD_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(method_column_length);
        const LINE_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(line_column_length);
        const POSITION_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(position_column_length);
        const MODULE_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(module_column_length);

        return `${StackTraceParser.TableLineTopLeftSeparator}${METHOD_COLUMN_LINE}${StackTraceParser.TableLineTopSeparator}${LINE_COLUMN_LINE}${StackTraceParser.TableLineTopSeparator}${POSITION_COLUMN_LINE}${StackTraceParser.TableLineTopSeparator}${MODULE_COLUMN_LINE}${StackTraceParser.TableLineTopRightSeparator}`;
    }

    private static GetTableHeaderLine(method_column_length: number, line_column_length: number, position_column_length: number, module_column_length: number): string
    {
        const METHOD_HEADER: string = StackTraceParser.GetPaddedString(StackTraceParser.MethodColumnName, method_column_length, 'center');
        const LINE_HEADER: string = StackTraceParser.GetPaddedString(StackTraceParser.LineColumnName, line_column_length, 'center');
        const POSITION_HEADER: string = StackTraceParser.GetPaddedString(StackTraceParser.PositionColumnName, position_column_length, 'center');
        const MODULE_HEADER: string = StackTraceParser.GetPaddedString(StackTraceParser.ModuleColumnName, module_column_length, 'center');

        return `${StackTraceParser.TableLineVerticalSeparator}${METHOD_HEADER}${StackTraceParser.TableLineVerticalSeparator}${LINE_HEADER}${StackTraceParser.TableLineVerticalSeparator}${POSITION_HEADER}${StackTraceParser.TableLineVerticalSeparator}${MODULE_HEADER}${StackTraceParser.TableLineVerticalSeparator}`;
    }

    private static GetTableSeparationLine(method_column_length: number, line_column_length: number, position_column_length: number, module_column_length: number): string
    {
        const METHOD_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(method_column_length);
        const LINE_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(line_column_length);
        const POSITION_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(position_column_length);
        const MODULE_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(module_column_length);

        return `${StackTraceParser.TableLineLeftSeparator}${METHOD_COLUMN_LINE}${StackTraceParser.TableLineCrossSeparator}${LINE_COLUMN_LINE}${StackTraceParser.TableLineCrossSeparator}${POSITION_COLUMN_LINE}${StackTraceParser.TableLineCrossSeparator}${MODULE_COLUMN_LINE}${StackTraceParser.TableLineRightSeparator}`;
    }

    private static GetTableBottomLine(method_column_length: number, line_column_length: number, position_column_length: number, module_column_length: number): string
    {
        const METHOD_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(method_column_length);
        const LINE_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(line_column_length);
        const POSITION_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(position_column_length);
        const MODULE_COLUMN_LINE: string = StackTraceParser.TableLineHorizontalSeparator.repeat(module_column_length);

        return `${StackTraceParser.TableLineBottomLeftSeparator}${METHOD_COLUMN_LINE}${StackTraceParser.TableLineBottomSeparator}${LINE_COLUMN_LINE}${StackTraceParser.TableLineBottomSeparator}${POSITION_COLUMN_LINE}${StackTraceParser.TableLineBottomSeparator}${MODULE_COLUMN_LINE}${StackTraceParser.TableLineBottomRightSeparator}`;
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
        const LONGEST_METHOD_LENGTH: number = this.getLongestMethodLength();
        const LONGEST_LINE_LENGTH: number = this.getLongestLineLength();
        const LONGEST_MODULE_LENGTH: number = this.getLongestModuleLength();
        const LONGEST_POSITION_LENGTH: number = this.getLongestPositionLength();

        const METHOD_COLUMN_LENGTH: number = LONGEST_METHOD_LENGTH + StackTraceParserEnum.COLUMN_PADDING;
        const LINE_COLUMN_LENGTH: number = LONGEST_LINE_LENGTH + StackTraceParserEnum.COLUMN_PADDING;
        const POSITION_COLUMN_LENGTH: number = LONGEST_POSITION_LENGTH + StackTraceParserEnum.COLUMN_PADDING;
        const MODULE_COLUMN_LENGTH: number = LONGEST_MODULE_LENGTH + StackTraceParserEnum.COLUMN_PADDING;
        const TABLE: Array<string> = [];

        TABLE.push(StackTraceParser.GetTableTopLine(METHOD_COLUMN_LENGTH, LINE_COLUMN_LENGTH, POSITION_COLUMN_LENGTH, MODULE_COLUMN_LENGTH));
        TABLE.push(StackTraceParser.GetTableHeaderLine(METHOD_COLUMN_LENGTH, LINE_COLUMN_LENGTH, POSITION_COLUMN_LENGTH, MODULE_COLUMN_LENGTH));
        TABLE.push(StackTraceParser.GetTableSeparationLine(METHOD_COLUMN_LENGTH, LINE_COLUMN_LENGTH, POSITION_COLUMN_LENGTH, MODULE_COLUMN_LENGTH));

        for (const LINE of this.lines)
        {
            const METHOD_CONTENT: string = StackTraceParser.GetPaddedString(LINE.method, METHOD_COLUMN_LENGTH, 'left');
            const LINE_NUMBER_CONTENT: string = StackTraceParser.GetPaddedString(LINE.line.toString(), LINE_COLUMN_LENGTH, 'right');
            const POSITION_CONTENT: string = StackTraceParser.GetPaddedString(LINE.position.toString(), POSITION_COLUMN_LENGTH, 'right');
            const MODULE_CONTENT: string = StackTraceParser.GetPaddedString(LINE.module, MODULE_COLUMN_LENGTH, 'left');

            TABLE.push(`${StackTraceParser.TableLineVerticalSeparator}${METHOD_CONTENT}${StackTraceParser.TableLineVerticalSeparator}${LINE_NUMBER_CONTENT}${StackTraceParser.TableLineVerticalSeparator}${POSITION_CONTENT}${StackTraceParser.TableLineVerticalSeparator}${MODULE_CONTENT}${StackTraceParser.TableLineVerticalSeparator}`);
        }

        TABLE.push(StackTraceParser.GetTableBottomLine(METHOD_COLUMN_LENGTH, LINE_COLUMN_LENGTH, POSITION_COLUMN_LENGTH, MODULE_COLUMN_LENGTH));

        return TABLE;
    }

    private getLongestMethodLength(): number
    {
        let longest_method_length: number = StackTraceParser.MethodColumnName.length;

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
        let longest_line_length: number = StackTraceParser.LineColumnName.length;

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
        let longest_position_length: number = StackTraceParser.PositionColumnName.length;

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
        let longest_module_length: number = StackTraceParser.ModuleColumnName.length;

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

    private parseNextLine(): StackTraceLineParsingResultInterface | undefined
    {
        const NEXT_LINE: string | undefined = this.stackTrace.shift();

        if (NEXT_LINE === undefined)
        {
            return undefined;
        }

        if (StackTraceParser.ErrorMessageRegExp.test(NEXT_LINE))
        {
            return undefined;
        }

        const TRIMMED_LINE: string = NEXT_LINE.trim();
        const CLEANED_LINE: string = TRIMMED_LINE.replace(/^at /, "");
        const FILE_INDICATOR: RegExpExecArray | null = StackTraceParser.FileIndicatorRegExp.exec(CLEANED_LINE);
        const FILE_INDICATOR_CONTENT: string | undefined = FILE_INDICATOR?.groups?.['file'];
        const LINE_AND_POSITION: StackTraceParserLineAndPositionInterface = StackTraceParser.ExtractLineAndPosition(FILE_INDICATOR_CONTENT ?? TRIMMED_LINE);
        const LINE_WITHOUT_FILE_INDICATOR: string = CLEANED_LINE.replace(StackTraceParser.FileIndicatorRegExp, "");
        const LINE_WITHOUT_FILE_INDICATOR_AND_LINE_AND_POSITION: string = LINE_WITHOUT_FILE_INDICATOR.replace(StackTraceParser.LineAndPositionRegExp, "");
        const METHOD: string = LINE_WITHOUT_FILE_INDICATOR_AND_LINE_AND_POSITION.replaceAll(/\(|\)/g, "").trim();
        const FOUND_MODULE: string = FILE_INDICATOR_CONTENT?.replace(/^\(/, "").replace(/\)$/, "").replace(StackTraceParser.LineAndPositionRegExp, "").replace(/file:\/\//, "") ?? ">internal<";

        return {
            method: METHOD === "" ? ">anonymous<" : METHOD,
            line: LINE_AND_POSITION.line,
            position: LINE_AND_POSITION.position,
            module: FOUND_MODULE
        };
    }
}

export { StackTraceParser };
