import type { NormalizedError } from "../definition/_index.mjs";
import { normalizeErrorTree } from "./normalize-error-tree.mjs";

const enum TreeStructure
{
	CHILD_CONNECTOR /*     */ = "├─── ",
	LAST_CHILD_CONNECTOR /**/ = "└─── ",
	CHILD_INDENT /*        */ = "│    ",
	LAST_CHILD_INDENT /*   */ = "     ",
}

function generateTreeStructure(errors: Array<NormalizedError>, indent: string): string
{
	let result: string = "";

	const LAST_INDEX: number = errors.length - 1;

	errors.forEach(
		(error: NormalizedError, index: number): void =>
		{
			const IS_LAST_CHILD: boolean = index === LAST_INDEX;
			const CONNECTOR: string = IS_LAST_CHILD ? TreeStructure.LAST_CHILD_CONNECTOR : TreeStructure.CHILD_CONNECTOR;
			const INDENT: string = IS_LAST_CHILD ? TreeStructure.LAST_CHILD_INDENT : TreeStructure.CHILD_INDENT;

			result = `${result}${indent}${CONNECTOR}${error.message}\n`;
			result = result + generateTreeStructure(error.causes, `${indent}${INDENT}`);
		}
	);

	return result;
}

function stringifyErrorTree(error: Error | NormalizedError): string
{
	const ERROR: NormalizedError = (error instanceof Error) ? normalizeErrorTree(error) : error;

	return `${ERROR.message}\n${generateTreeStructure(ERROR.causes, "")}`;
}

export { stringifyErrorTree };
