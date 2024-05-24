import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { IndentUtility } from "../../src/_index.mjs";

describe("IndentUtility", (): void => {
	describe("Prune", (): void => {
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
			`;
			/* cspell:enable */

			const EXPECTED: string = [
				/* cspell:disable */
				"",
				"Lorem ipsum dolor sit amet,",
				"consectetur adipiscing elit.",
				"",
				"\tDonec at ex sed sapien fringilla malesuada",
				"",
				"Vestibulum facilisis sem quis felis pellentesque mollis.",
				"- Curabitur tincidunt",
				"- Augue non euismod consectetur",
				"- Lectus leo fringilla nisi",
				"",
				/* cspell:enable */
			].join("\n");

			strictEqual(IndentUtility.Prune(TEXT), EXPECTED);
		});
	});

	describe("Prunetrim", (): void => {
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

			strictEqual(IndentUtility.PruneTrim(TEXT), EXPECTED);
		});

		it("should trim leading and trailing whitespaces", (): void => {
			const TEXT: string = "\n\t\nLorem ipsum\n\t\n";

			strictEqual(IndentUtility.PruneTrim(TEXT), "Lorem ipsum");
		});
	});
});
