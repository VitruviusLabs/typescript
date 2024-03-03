import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { UnknownError, ValidationError } from "../../src/index.mjs";
import { rethrowUnexpectedError } from "../../src/utils/rethrow-unexpected-error.mjs";

describe("rethrowUnexpectedError", (): void => {
	it("should return when given a ValidationError", (): void => {
		const WRAPPER = (): void =>
		{
			rethrowUnexpectedError(new ValidationError("test"));
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when given any other instance of Error", (): void => {
		const WRAPPER = (): void =>
		{
			rethrowUnexpectedError(new Error("test"));
		};

		throws(WRAPPER, createErrorTest(new Error("test")));
	});

	it("should convert anything else into an instance of UnknownError before throwing it", (): void => {
		const WRAPPER = (): void =>
		{
			rethrowUnexpectedError("reason");
		};

		throws(WRAPPER, createErrorTest(new UnknownError("An unknown error occurred.", "reason")));
	});
});
