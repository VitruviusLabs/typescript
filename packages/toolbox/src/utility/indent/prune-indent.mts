/**
 * Prune indent
 *
 * @remarks
 * - Blank lines are trimmed
 * - The indent of the first non-blank line is removed from all lines
 * - Doesn't try to be smart about mixed tabs and spaces.
 * - Preserve leading and trailing lines
 */
function pruneIndent(text: string): string
{
	const TEXT: string = text.replaceAll(/^[\t ]+$/gm, "");

	const MATCH: RegExpExecArray | null = /^\n*(?<indent>[\t ]+)/.exec(TEXT);

	const INDENT: string | undefined = MATCH?.groups?.["indent"];

	if (INDENT === undefined)
	{
		return TEXT;
	}

	return TEXT.replaceAll(new RegExp(`^${INDENT}`, "gm"), "");
}

export { pruneIndent };
