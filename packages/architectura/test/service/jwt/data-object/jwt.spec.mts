import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, strictEqual, throws } from "node:assert";
import { type SinonFakeTimers, useFakeTimers } from "sinon";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { JWT, type JWTClaimsInterface, type SecretType } from "../../../../src/_index.mjs";

describe("JWT", (): void => {
	const ALGORITHM: string = "RSA-SHA256";
	const SECRET: SecretType = "secret";
	const CLOCK: SinonFakeTimers = useFakeTimers({ toFake: ["Date"] });

	beforeEach((): void => {
		CLOCK.reset();
	});

	after((): void => {
		CLOCK.restore();
	});

	describe("constructor", (): void => {
		it("should create a new JWT", (): void => {
			const CLAIMS: JWTClaimsInterface = {
				iat: -1,
				nbf: 0,
				exp: 1,
			};

			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, CLAIMS);

			deepStrictEqual(Reflect.get(TOKEN, "header"), { typ: "JWT", alg: ALGORITHM });
			strictEqual(Reflect.get(TOKEN, "secret"), SECRET);
			deepStrictEqual(Reflect.get(TOKEN, "claims"), CLAIMS);
		});

		it("should throw if the algorithm is unsupported", (): void => {
			const CLAIMS: JWTClaimsInterface = {};

			const WRAPPER = (): void => {
				new JWT("------", SECRET, CLAIMS);
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the secret is invalid", (): void => {
			const CLAIMS: JWTClaimsInterface = {};

			const WRAPPER = (): void => {
				new JWT(ALGORITHM, "", CLAIMS);
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the claims are invalid (iat)", (): void => {
			const CLAIMS: JWTClaimsInterface = {
				iat: 1,
			};

			const WRAPPER = (): void => {
				new JWT(ALGORITHM, SECRET, CLAIMS);
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the claims are invalid (nbf)", (): void => {
			const CLAIMS: JWTClaimsInterface = {
				nbf: 1,
			};

			const WRAPPER = (): void => {
				new JWT(ALGORITHM, SECRET, CLAIMS);
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the claims are invalid (exp)", (): void => {
			const CLAIMS: JWTClaimsInterface = {
				exp: -1,
			};

			const WRAPPER = (): void => {
				new JWT(ALGORITHM, SECRET, CLAIMS);
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the claims are invalid (iat > nbf)", (): void => {
			const CLAIMS: JWTClaimsInterface = {
				iat: 2,
				nbf: 1,
			};

			const WRAPPER = (): void => {
				new JWT(ALGORITHM, SECRET, CLAIMS);
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the claims are invalid (iat > exp)", (): void => {
			const CLAIMS: JWTClaimsInterface = {
				iat: 2,
				exp: 1,
			};

			const WRAPPER = (): void => {
				new JWT(ALGORITHM, SECRET, CLAIMS);
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the claims are invalid (nbf > exp)", (): void => {
			const CLAIMS: JWTClaimsInterface = {
				nbf: 2,
				exp: 1,
			};

			const WRAPPER = (): void => {
				new JWT(ALGORITHM, SECRET, CLAIMS);
			};

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("getAlgorithm", (): void => {
		it("should get the algorithm", (): void => {
			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, {});

			strictEqual(TOKEN.getAlgorithm(), "RSA-SHA256");
		});
	});

	describe("getClaims", (): void => {
		it("should get the claims", (): void => {
			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, { exp: 1 });

			deepStrictEqual(TOKEN.getClaims(), { exp: 1 });
		});
	});

	describe("setClaims", (): void => {
		it("should set the claims", (): void => {
			const CLAIMS: JWTClaimsInterface = {
				iat: -1,
				nbf: 0,
				exp: 1,
			};

			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, {});

			TOKEN.setClaims(CLAIMS);

			deepStrictEqual(Reflect.get(TOKEN, "claims"), CLAIMS);
		});

		it("should throw if the claims are invalid (iat)", (): void => {
			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, {});

			const WRAPPER = (): void => {
				TOKEN.setClaims({
					iat: 1,
				});
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the claims are invalid (nbf)", (): void => {
			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, {});

			const WRAPPER = (): void => {
				TOKEN.setClaims({
					nbf: 1,
				});
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the claims are invalid (exp)", (): void => {
			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, {});

			const WRAPPER = (): void => {
				TOKEN.setClaims({
					exp: -1,
				});
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the claims are invalid (iat > nbf)", (): void => {
			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, {});

			const WRAPPER = (): void => {
				TOKEN.setClaims({
					iat: 2,
					nbf: 1,
				});
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the claims are invalid (iat > exp)", (): void => {
			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, {});

			const WRAPPER = (): void => {
				TOKEN.setClaims({
					iat: 2,
					exp: 1,
				});
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should throw if the claims are invalid (nbf > exp)", (): void => {
			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, {});

			const WRAPPER = (): void => {
				TOKEN.setClaims({
					nbf: 2,
					exp: 1,
				});
			};

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("toString", (): void => {
		it("should serialize the token", (): void => {
			const CLAIMS: JWTClaimsInterface = {
				iat: -1,
				nbf: 0,
				exp: 1,
			};

			const EXPECTED: string = [
				"eyJ0eXAiOiJKV1QiLCJhbGciOiJSU0EtU0hBMjU2In0",
				"eyJpYXQiOi0xLCJuYmYiOjAsImV4cCI6MX0",
				"wrzDqizDh8K5woXCvcKFwolYwrTCkcKResO0wpZAwp4Yw6_CvsKQw55iw4bDqsKnR8OnwqLCpjM",
			].join(".");

			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, CLAIMS);

			strictEqual(TOKEN.toString(), EXPECTED);
		});
	});
});
