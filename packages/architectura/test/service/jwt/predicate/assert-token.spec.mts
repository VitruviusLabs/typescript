import { describe, it } from "node:test";
import { doesNotThrow, throws } from "node:assert";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { assertToken } from "../../../../src/service/jwt/predicate/assert-token.mjs";

describe("isToken", (): void => {
	it("should return when given a tuple of 3 strings", (): void =>
	{
		const WRAPPER = (): void =>
		{
			assertToken(["", "", ""]);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when given an empty array", (): void => {
		const WRAPPER = (): void =>
		{
			assertToken([]);
		};

		throws(WRAPPER, createErrorTest());
	});

	it("should throw when given an array without enough elements", (): void => {
		const WRAPPER = (): void =>
		{
			assertToken(["", ""]);
		};

		throws(WRAPPER, createErrorTest());
	});

	it("should throw when given an array with too many elements", (): void => {
		const WRAPPER = (): void =>
		{
			assertToken(["", "", "", ""]);
		};

		throws(WRAPPER, createErrorTest());
	});
});
