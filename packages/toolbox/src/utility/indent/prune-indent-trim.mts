import { pruneIndent } from "./prune-indent.mjs";

/**
 * Prune indent and trim
 *
 * @remarks
 * - Blank lines are trimmed
 * - The indent of the first non-blank line is removed from all lines
 * - Doesn't try to be smart about mixed tabs and spaces.
 * - Remove leading and trailing lines
 */
function pruneIndentTrim(text: string): string
{
	return pruneIndent(text).trim();
}

export { pruneIndentTrim };
