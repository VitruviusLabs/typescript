import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { pruneIndentTrim } from "../../src/_index.mjs";

describe("pruneIndentTrim", (): void => {
	it("should trim blank lines", (): void => {
		const TEXT: string = "Alpha\n    \nOmega";
		const EXPECTED: string = "Alpha\n\nOmega";

		strictEqual(pruneIndentTrim(TEXT), EXPECTED);
	});

	it("shouldn't try to be smart about mixed tabs and spaces", (): void => {
		const TEXT: string = "\tAlpha\n    Omega";
		const EXPECTED: string = "Alpha\n    Omega";

		strictEqual(pruneIndentTrim(TEXT), EXPECTED);
	});

	it("should remove leading and trailing lines", (): void => {
		const TEXT: string = "\nAlpha\n";
		const EXPECTED: string = "Alpha";

		strictEqual(pruneIndentTrim(TEXT), EXPECTED);
	});

	it("should remove leading indent from all lines", (): void => {
		/* cspell:disable */
		const TEXT: string = `
			Lorem ipsum dolor sit amet,
			consectetur adipiscing elit.

				Donec at ex sed sapien fringilla malesuada

			Vestibulum facilisis sem quis felis pellentesque mollis.
			- Curabitur tincidunt
			- Augue non euismod consectetur
			- Lectus leo fringilla nisi
		`.trim();
		/* cspell:enable */

		const EXPECTED: string = [
			/* cspell:disable */
			"Lorem ipsum dolor sit amet,",
			"consectetur adipiscing elit.",
			"",
			"\tDonec at ex sed sapien fringilla malesuada",
			"",
			"Vestibulum facilisis sem quis felis pellentesque mollis.",
			"- Curabitur tincidunt",
			"- Augue non euismod consectetur",
			"- Lectus leo fringilla nisi",
			/* cspell:enable */
		].join("\n");

		strictEqual(pruneIndentTrim(TEXT), EXPECTED);
	});
});
