import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { ReflectUtility } from "@vitruvius-labs/toolbox";
import { JWT, JWTFactory } from "../../../../src/_index.mjs";

describe("JWTFactory", (): void => {
	describe("Create", (): void => {
		it("should be able to create a JWT", (): void => {
			const JWT_GOAL: JWT = new JWT("RSA-SHA256", "your-256-bit-secret-here", {});
			const JWT_OBJECT: JWT = JWTFactory.Create("RSA-SHA256", "your-256-bit-secret-here", {});

			deepStrictEqual(JWT_OBJECT, JWT_GOAL);
		});
	});

	describe("Parse", (): void => {
		it("should be able to create, encode, and parse a JWT", (): void => {
			const JWT_OBJECT: JWT = new JWT("RSA-SHA256", "your-256-bit-secret-here", {});

			ReflectUtility.Set(JWT_OBJECT, "validateNBF", true);

			const ENCODED_JWT: string = JWT_OBJECT.toString();

			const PARSED_JWT: JWT = JWTFactory.Parse(ENCODED_JWT, "your-256-bit-secret-here");

			deepStrictEqual(PARSED_JWT, JWT_OBJECT);
		});
	});
});
