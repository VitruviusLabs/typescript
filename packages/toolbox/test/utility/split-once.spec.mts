import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert";
import { splitOnce } from "../../src/utility/split-once.mjs";

describe("splitOnce", (): void => {
	it("should split the value at the separator", (): void => {
		deepStrictEqual(splitOnce(" ", "Alpha Omega"), ["Alpha", "Omega"]);
		deepStrictEqual(splitOnce(":", "Alpha:Omega"), ["Alpha", "Omega"]);
		deepStrictEqual(splitOnce("T", "2000-01-01T12:00:00"), ["2000-01-01", "12:00:00"]);
	});

	it("should handle separator of various lengths", (): void => {
		deepStrictEqual(splitOnce(", ", "Alpha, Omega"), ["Alpha", "Omega"]);
		deepStrictEqual(splitOnce(":=:", "Alpha:=:Omega"), ["Alpha", "Omega"]);
	});

	it("should split the value only once", (): void => {
		deepStrictEqual(
			splitOnce(" ", "alpha beta gamma delta"),
			["alpha", "beta gamma delta"]
		);

		deepStrictEqual(
			splitOnce("---", "alpha---beta---gamma"),
			["alpha", "beta---gamma"]
		);
	});
});
