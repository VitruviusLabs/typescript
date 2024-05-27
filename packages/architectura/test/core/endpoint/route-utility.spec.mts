import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { RouteUtility } from "../../../src/_index.mjs";

describe("RouteUtility", (): void => {
	describe("NormalizeRoute", (): void => {
		it("should return a proper RegExp as is", (): void => {
			deepStrictEqual(RouteUtility.NormalizeRoute(/^.*$/u), /^.*$/u);
		});

		it("should add the unicode flag if missing", (): void => {
			deepStrictEqual(RouteUtility.NormalizeRoute(/^.*$/), /^.*$/u);
		});

		it("should normalize the RegExp to match from the beginning", (): void => {
			deepStrictEqual(RouteUtility.NormalizeRoute(/.*$/u), /^.*$/u);
		});

		it("should normalize the RegExp to match to the end", (): void => {
			deepStrictEqual(RouteUtility.NormalizeRoute(/^.*/u), /^.*$/u);
		});

		it("should convert a string to a RegExp, then apply the same normalization", (): void => {
			deepStrictEqual(RouteUtility.NormalizeRoute(".*"), /^.*$/u);
		});
	});
});
