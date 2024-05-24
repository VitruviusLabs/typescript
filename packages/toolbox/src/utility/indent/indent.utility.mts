/**
 * Indent utility
 *
 * @sealed
 */
class IndentUtility
{
	/**
	 * Prune indent
	 *
	 * @remarks
	 * - Blank lines are trimmed
	 * - The indent of the first non-blank line is removed from all lines
	 * - Doesn't try to be smart about mixed tabs and spaces.
	 * - Preserve leading and trailing lines
	 */
	public static Prune(text: string): string
	{
		const TEXT: string = text.replaceAll(/^[\t ]+$/gm, "");

		const MATCH: RegExpExecArray | null = /^[\t ]+/m.exec(TEXT);

		if (MATCH === null)
		{
			return TEXT;
		}

		const INDENT: string = MATCH[0];

		if (INDENT === "")
		{
			return TEXT;
		}

		return TEXT.replaceAll(new RegExp(`^${INDENT}`, "gm"), "");
	}

	/**
	 * Prune indent and trim
	 *
	 * @remarks
	 * - Blank lines are trimmed
	 * - The indent of the first non-blank line is removed from all lines
	 * - Doesn't try to be smart about mixed tabs and spaces.
	 * - Remove leading and trailing lines
	 */
	public static PruneTrim(text: string): string
	{
		return IndentUtility.Prune(text).trim();
	}
}

export { IndentUtility };
