import { describe, it } from "node:test";
import { doesNotThrow, throws } from "node:assert";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { validateSecret } from "../../../../src/service/jwt/utility/validate-secret.mjs";

describe("validateSecret", (): void => {
	it("should return when given a valid secret", (): void => {
		const WRAPPER = (): void => {
			return validateSecret("your-256-bit-secret-here");
		};

		doesNotThrow(WRAPPER);
	});

	it("should reject empty secrets", (): void => {
		const WRAPPER_STRING = (): void => {
			return validateSecret("");
		};

		const WRAPPER_BUFFER_VIEW = (): void => {
			return validateSecret(new Uint8Array(0));
		};

		throws(WRAPPER_STRING, createErrorTest());
		throws(WRAPPER_BUFFER_VIEW, createErrorTest());
	});
});

export { validateSecret };
