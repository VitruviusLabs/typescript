import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, strictEqual, throws } from "node:assert";
import { type SinonFakeTimers, useFakeTimers } from "sinon";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { JWT, type JWTClaimsInterface, type SecretType } from "../../../../src/_index.mjs";

describe("JWT", (): void => {
	const ALGORITHM: string = "RSA-SHA256";
	const SECRET: SecretType = "your-256-bit-secret-here";
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

			deepStrictEqual(TOKEN["header"], { typ: "JWT", alg: ALGORITHM });
			strictEqual(TOKEN["secret"], SECRET);
			deepStrictEqual(TOKEN["claims"], CLAIMS);
		});

		it("should validate the algorithm", (): void => {
			const CLAIMS: JWTClaimsInterface = {};

			const WRAPPER = (): void => {
				new JWT("------", SECRET, CLAIMS);
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should validate the secret", (): void => {
			const CLAIMS: JWTClaimsInterface = {};

			const WRAPPER = (): void => {
				new JWT(ALGORITHM, "", CLAIMS);
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should validate the claims", (): void => {
			const CLAIMS: JWTClaimsInterface = {
				iat: 1,
				nbf: 0,
				exp: -1,
			};

			const WRAPPER = (): void => {
				new JWT(ALGORITHM, SECRET, CLAIMS);
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should be resilient to external claims mutations", (): void => {
			const CLAIMS: JWTClaimsInterface = { iat: -1 };

			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, CLAIMS);

			CLAIMS.iat = 1;

			deepStrictEqual(TOKEN["claims"], { iat: -1 });
			deepStrictEqual(CLAIMS, { iat: 1 });
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

		it("should be resilient to external claims mutations", (): void => {
			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, { iat: -1 });

			TOKEN.getClaims().iat = 1;

			deepStrictEqual(TOKEN["claims"], { iat: -1 });
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

			deepStrictEqual(TOKEN["claims"], CLAIMS);
		});

		it("should validate the claims", (): void => {
			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, {});

			const WRAPPER = (): void => {
				TOKEN.setClaims({
					iat: 1,
					nbf: 0,
					exp: -1,
				});
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should be resilient to external claims mutations", (): void => {
			const CLAIMS: JWTClaimsInterface = { iat: -1 };

			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, {});

			TOKEN.setClaims(CLAIMS);

			CLAIMS.iat = 1;

			deepStrictEqual(TOKEN["claims"], { iat: -1 });
			deepStrictEqual(CLAIMS, { iat: 1 });
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
				/* cspell:disable */
				"eyJ0eXAiOiJKV1QiLCJhbGciOiJSU0EtU0hBMjU2In0",
				"eyJpYXQiOi0xLCJuYmYiOjAsImV4cCI6MX0",
				"DgVOw4htw6JsfVF4w7tCfQ7CjhHCscO1fcO9TcKEwoXDtUExNVLCncKyQMO3",
				/* cspell:enable */
			].join(".");

			const TOKEN: JWT = new JWT(ALGORITHM, SECRET, CLAIMS);

			strictEqual(TOKEN.toString(), EXPECTED);
		});
	});
});
