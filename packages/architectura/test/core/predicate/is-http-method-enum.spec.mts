import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { HTTPMethodEnum, isHTTPMethodEnum } from "../../../src/_index.mjs";
import { getAllValues } from "@vitruvius-labs/testing-ground";

describe("isHTTPMethodEnum", (): void => {
	it("should return true for valid HTTPMethodEnum values", (): void => {
		const VALID_VALUES: Array<HTTPMethodEnum> = [
			HTTPMethodEnum.GET,
			HTTPMethodEnum.HEAD,
			HTTPMethodEnum.POST,
			HTTPMethodEnum.PUT,
			HTTPMethodEnum.DELETE,
			HTTPMethodEnum.CONNECT,
			HTTPMethodEnum.OPTIONS,
			HTTPMethodEnum.TRACE,
			HTTPMethodEnum.PATCH,
		];

		for (const VALUE of VALID_VALUES)
		{
			strictEqual(isHTTPMethodEnum(VALUE), true);
		}
	});

	it("should return false for any other value", (): void => {
		const ALL_VALUES: Array<unknown> = getAllValues();

		for (const VALUE of ALL_VALUES)
		{
			strictEqual(isHTTPMethodEnum(VALUE), false);
		}
	});
});
