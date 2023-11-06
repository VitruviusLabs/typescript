import { NumericBaseEnum } from "../Number/NumericBaseEnum.mjs";

import { StackTraceParserEnum } from "./StackTraceParser/StackTraceParserEnum.mjs";

import type { StackTraceLineParsingResultInterface } from "./StackTraceParser/StackTraceLineParsingResultInterface.js";

import type { StackTraceParserLineAndPositionInterface } from "./StackTraceParser/StackTraceParserLineAndPositionInterface.mjs";

class StackTraceParser {
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

    public constructor(error: Error) {
        this.error = error;

        if (this.error.stack === undefined) {
            throw new Error("Error has no stack trace defined.");
        }

        this.stackTrace = this.error.stack.split("\n");
        this.message = this.error.message;

        while (this.stackTrace.length > 0) {
            const nextLine: StackTraceLineParsingResultInterface | undefined = this.parseNextLine();

            if (nextLine === undefined) {
                continue;
            }

            this.lines.push(nextLine);
        }
    }

    private static ExtractLineAndPosition(string: string): StackTraceParserLineAndPositionInterface {
        const lineAndPosition: RegExpExecArray | null = StackTraceParser.LineAndPositionRegExp.exec(string);

        if (lineAndPosition === null) {
            return {
                line: StackTraceParserEnum.LINE_NOT_FOUND_INDEX,
                position: StackTraceParserEnum.POSITION_NOT_FOUND_INDEX
            };
        }

        const foundLine: string | undefined = lineAndPosition.groups?.['line'];

        if (foundLine === undefined) {
            return {
                line: StackTraceParserEnum.LINE_NOT_FOUND_INDEX,
                position: StackTraceParserEnum.POSITION_NOT_FOUND_INDEX
            };
        }

        const line: number = parseInt(foundLine, NumericBaseEnum.DECIMAL);
        const foundPosition: string | undefined = lineAndPosition.groups?.['position'];

        if (foundPosition === undefined) {
            return {
                line: line,
                position: StackTraceParserEnum.POSITION_NOT_FOUND_INDEX
            };
        }

        const position: number = parseInt(foundPosition, NumericBaseEnum.DECIMAL);

        return {
            line: line,
            position: position
        };
    }

    private static GetPaddedString(string: string, length: number, align: 'center' | 'left' | 'right' = 'left'): string {
        if (align === 'left') {
            return ` ${string}`.padEnd(length, " ");
        }

        if (align === 'right') {
            return `${string} `.padStart(length, " ");
        }

        const stringPadding: number = Math.floor((length - string.length) / StackTraceParserEnum.COLUMN_PADDING);
        const leftPaddedString: string = string.padStart(stringPadding + string.length, " ");
        const paddedString: string = leftPaddedString.padEnd(length, " ");

        return paddedString;
    }

    private static GetTableTopLine(methodColumnLength: number, lineColumnLength: number, positionColumnLength: number, moduleColumnLength: number): string {
        const methodColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(methodColumnLength);
        const lineColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(lineColumnLength);
        const positionColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(positionColumnLength);
        const moduleColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(moduleColumnLength);

        return `${StackTraceParser.TableLineTopLeftSeparator}${methodColumnLine}${StackTraceParser.TableLineTopSeparator}${lineColumnLine}${StackTraceParser.TableLineTopSeparator}${positionColumnLine}${StackTraceParser.TableLineTopSeparator}${moduleColumnLine}${StackTraceParser.TableLineTopRightSeparator}`;
    }

    private static GetTableHeaderLine(methodColumnLength: number, lineColumnLength: number, positionColumnLength: number, moduleColumnLength: number): string {
        const methodHeader: string = StackTraceParser.GetPaddedString(StackTraceParser.MethodColumnName, methodColumnLength, 'center');
        const lineHeader: string = StackTraceParser.GetPaddedString(StackTraceParser.LineColumnName, lineColumnLength, 'center');
        const positionHeader: string = StackTraceParser.GetPaddedString(StackTraceParser.PositionColumnName, positionColumnLength, 'center');
        const moduleHeader: string = StackTraceParser.GetPaddedString(StackTraceParser.ModuleColumnName, moduleColumnLength, 'center');

        return `${StackTraceParser.TableLineVerticalSeparator}${methodHeader}${StackTraceParser.TableLineVerticalSeparator}${lineHeader}${StackTraceParser.TableLineVerticalSeparator}${positionHeader}${StackTraceParser.TableLineVerticalSeparator}${moduleHeader}${StackTraceParser.TableLineVerticalSeparator}`;
    }

    private static GetTableSeparationLine(methodColumnLength: number, lineColumnLength: number, positionColumnLength: number, moduleColumnLength: number): string {
        const methodColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(methodColumnLength);
        const lineColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(lineColumnLength);
        const positionColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(positionColumnLength);
        const moduleColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(moduleColumnLength);

        return `${StackTraceParser.TableLineLeftSeparator}${methodColumnLine}${StackTraceParser.TableLineCrossSeparator}${lineColumnLine}${StackTraceParser.TableLineCrossSeparator}${positionColumnLine}${StackTraceParser.TableLineCrossSeparator}${moduleColumnLine}${StackTraceParser.TableLineRightSeparator}`;
    }

    private static GetTableBottomLine(methodColumnLength: number, lineColumnLength: number, positionColumnLength: number, moduleColumnLength: number): string {
        const methodColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(methodColumnLength);
        const lineColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(lineColumnLength);
        const positionColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(positionColumnLength);
        const moduleColumnLine: string = StackTraceParser.TableLineHorizontalSeparator.repeat(moduleColumnLength);

        return `${StackTraceParser.TableLineBottomLeftSeparator}${methodColumnLine}${StackTraceParser.TableLineBottomSeparator}${lineColumnLine}${StackTraceParser.TableLineBottomSeparator}${positionColumnLine}${StackTraceParser.TableLineBottomSeparator}${moduleColumnLine}${StackTraceParser.TableLineBottomRightSeparator}`;
    }

    /**
     * getMessage
     */
    public getMessage(): string {
        return this.message;
    }

    /**
     * getLines
     */
    public getLines(): Array<StackTraceLineParsingResultInterface> {
        return this.lines;
    }

    public getStackTraceAsTable(): Array<string> {
        const constLongestMethodLength: number = this.getLongestMethodLength();
        const constLongestLineLength: number = this.getLongestLineLength();
        const constLongestModuleLength: number = this.getLongestModuleLength();
        const longestPositionLength: number = this.getLongestPositionLength();

        const methodColumnLength: number = constLongestMethodLength + StackTraceParserEnum.COLUMN_PADDING;
        const lineColumnLength: number = constLongestLineLength + StackTraceParserEnum.COLUMN_PADDING;
        const positionColumnLength: number = longestPositionLength + StackTraceParserEnum.COLUMN_PADDING;
        const moduleColumnLength: number = constLongestModuleLength + StackTraceParserEnum.COLUMN_PADDING;
        const table: Array<string> = [];

        table.push(StackTraceParser.GetTableTopLine(methodColumnLength, lineColumnLength, positionColumnLength, moduleColumnLength));
        table.push(StackTraceParser.GetTableHeaderLine(methodColumnLength, lineColumnLength, positionColumnLength, moduleColumnLength));
        table.push(StackTraceParser.GetTableSeparationLine(methodColumnLength, lineColumnLength, positionColumnLength, moduleColumnLength));

        for (const line of this.lines) {
            const methodContent: string = StackTraceParser.GetPaddedString(line.method, methodColumnLength, 'left');
            const lineNumberContent: string = StackTraceParser.GetPaddedString(line.line.toString(), lineColumnLength, 'right');
            const positionContent: string = StackTraceParser.GetPaddedString(line.position.toString(), positionColumnLength, 'right');
            const moduleContent: string = StackTraceParser.GetPaddedString(line.module, moduleColumnLength, 'left');

            table.push(`${StackTraceParser.TableLineVerticalSeparator}${methodContent}${StackTraceParser.TableLineVerticalSeparator}${lineNumberContent}${StackTraceParser.TableLineVerticalSeparator}${positionContent}${StackTraceParser.TableLineVerticalSeparator}${moduleContent}${StackTraceParser.TableLineVerticalSeparator}`);
        }

        table.push(StackTraceParser.GetTableBottomLine(methodColumnLength, lineColumnLength, positionColumnLength, moduleColumnLength));

        return table;
    }

    private getLongestMethodLength(): number {
        let longestMethodLength: number = StackTraceParser.MethodColumnName.length;

        for (const line of this.lines) {
            const methodLength: number = line.method.length;

            if (methodLength > longestMethodLength) {
                longestMethodLength = methodLength;
            }
        }

        return longestMethodLength;
    }

    private getLongestLineLength(): number {
        let longestLineLength: number = StackTraceParser.LineColumnName.length;

        for (const line of this.lines) {
            const lineLength: number = line.line.toString().length;

            if (lineLength > longestLineLength) {
                longestLineLength = lineLength;
            }
        }

        return longestLineLength;
    }

    private getLongestPositionLength(): number {
        let longestPositionLength: number = StackTraceParser.PositionColumnName.length;

        for (const line of this.lines) {
            const positionLength: number = line.position.toString().length;

            if (positionLength > longestPositionLength) {
                longestPositionLength = positionLength;
            }
        }

        return longestPositionLength;
    }

    private getLongestModuleLength(): number {
        let longestModuleLength: number = StackTraceParser.ModuleColumnName.length;

        for (const line of this.lines) {
            const moduleLength: number = line.module.length;

            if (moduleLength > longestModuleLength) {
                longestModuleLength = moduleLength;
            }
        }

        return longestModuleLength;
    }

    private parseNextLine(): StackTraceLineParsingResultInterface|undefined {
        const nextLine: string | undefined = this.stackTrace.shift();

        if (nextLine === undefined) {
            return undefined;
        }

        if (StackTraceParser.ErrorMessageRegExp.test(nextLine)) {
            return undefined;
        }

        const trimmedLine: string = nextLine.trim();
        const cleanedLine: string = trimmedLine.replace(/^at /, "");
        const fileIndicator: RegExpExecArray | null = StackTraceParser.FileIndicatorRegExp.exec(cleanedLine);
        const fileIndicatorContent: string | undefined = fileIndicator?.groups?.['file'];
        const lineAndPosition: StackTraceParserLineAndPositionInterface = StackTraceParser.ExtractLineAndPosition(fileIndicatorContent ?? trimmedLine);
        const lineWithoutFileIndicator: string = cleanedLine.replace(StackTraceParser.FileIndicatorRegExp, "");
        const lineWithoutFileIndicatorAndLineAndPosition: string = lineWithoutFileIndicator.replace(StackTraceParser.LineAndPositionRegExp, "");
        const method: string = lineWithoutFileIndicatorAndLineAndPosition.replaceAll(/\(|\)/g, "").trim();
        const foundModule: string = fileIndicatorContent?.replace(/^\(/, "").replace(/\)$/, "").replace(StackTraceParser.LineAndPositionRegExp, "").replace(/file:\/\//, "") ?? ">internal<";

        return {
            method: method === "" ? ">anonymous<" : method,
            line: lineAndPosition.line,
            position: lineAndPosition.position,
            module: foundModule
        };
    }


}

export { StackTraceParser };
