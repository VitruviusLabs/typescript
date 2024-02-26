import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { Helper, type NormalizedError } from "../../src/index.mjs";

// cspell:ignore lorem ipsum dolor sit amet consectetur adipiscing elit

describe("Helper.simplifyError", (): void => {
	it("should simplify an error", (): void => {
		const EXPECTED_RESULT: NormalizedError = {
			message: "lorem ipsum",
			causes: [],
		};

		const RESULT: unknown = Helper.normalizeErrorTree(new Error("lorem ipsum"));

		deepStrictEqual(RESULT, EXPECTED_RESULT);
	});

	it("should provide a placeholder for an error without message", (): void => {
		const EXPECTED_RESULT: NormalizedError = {
			message: "An unknown error occurred.",
			causes: [],
		};

		const RESULT: unknown = Helper.normalizeErrorTree(new Error());

		deepStrictEqual(RESULT, EXPECTED_RESULT);
	});

	it("should add the simplified cause to the causes", (): void => {
		const EXPECTED_RESULT: NormalizedError = {
			message: "lorem ipsum",
			causes: [
				{
					message: "dolor sit amet",
					causes: [],
				},
			],
		};

		const RESULT: unknown = Helper.normalizeErrorTree(
			new Error("lorem ipsum", {
				cause: new Error("dolor sit amet"),
			})
		);

		deepStrictEqual(RESULT, EXPECTED_RESULT);
	});

	it("should add all the simplified errors of an AggregateError to the causes", (): void => {
		const EXPECTED_RESULT: NormalizedError = {
			message: "lorem ipsum",
			causes: [
				{
					message: "dolor sit amet",
					causes: [],
				},
				{
					message: "consectetur adipiscing elit",
					causes: [],
				},
			],
		};

		const RESULT: unknown = Helper.normalizeErrorTree(
			new AggregateError(
				[
					new Error("dolor sit amet"),
					new Error("consectetur adipiscing elit"),
				],
				"lorem ipsum"
			)
		);

		deepStrictEqual(RESULT, EXPECTED_RESULT);
	});
});
