import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { AccessControlDefinition } from "../../../src/core/endpoint/access-control-definition.mjs";

describe("AccessControlDefinition", (): void => {
	describe("getAllowedHeaders", (): void => {
		it("should return the allowedHeaders property", (): void => {
			const allowedHeaders: Array<string> = ["Content-Type", "Authorization"];

			const accessControlDefinition: AccessControlDefinition = new AccessControlDefinition({
				allowedHeaders: allowedHeaders,
				allowedOrigins: [],
				maxAge: 0,
			});

			deepStrictEqual(accessControlDefinition.getAllowedHeaders(), allowedHeaders);
		});
	});

	describe("getAllowedOrigins", (): void => {
		it("should return the allowedOrigins property", (): void => {
			const allowedOrigins: Array<string> = ["http://localhost:3000", "https://example.com"];

			const accessControlDefinition: AccessControlDefinition = new AccessControlDefinition({
				allowedHeaders: [],
				allowedOrigins: allowedOrigins,
				maxAge: 0,
			});

			deepStrictEqual(accessControlDefinition.getAllowedOrigins(), allowedOrigins);
		});
	});

	describe("getMaxAge", (): void => {
		it("should return the maxAge property", (): void => {
			const maxAge: number = 3600;

			const accessControlDefinition: AccessControlDefinition = new AccessControlDefinition({
				allowedHeaders: [],
				allowedOrigins: [],
				maxAge: maxAge,
			});

			deepStrictEqual(accessControlDefinition.getMaxAge(), maxAge);
		});
	});

	describe("generatePreflightHeaders", (): void => {
		it("should return the correct headers", (): void => {
			const allowedHeaders: Array<string> = ["Content-Type", "Authorization"];
			const allowedOrigins: Array<string> = ["http://localhost:3000", "https://example.com"];
			const maxAge: number = 3600;

			const accessControlDefinition: AccessControlDefinition = new AccessControlDefinition({
				allowedHeaders: allowedHeaders,
				allowedOrigins: allowedOrigins,
				maxAge: maxAge,
			});

			const headers: Headers = accessControlDefinition.generatePreflightHeaders();

			const expectedHeaders: Headers = new Headers();

			expectedHeaders.set("Access-Control-Allow-Headers", allowedHeaders.join(", "));
			expectedHeaders.set("Access-Control-Allow-Origin", allowedOrigins.join(", "));
			expectedHeaders.set("Access-Control-Max-Age", maxAge.toString());
			expectedHeaders.set("Content-Length", "0");

			deepStrictEqual(headers, expectedHeaders);
		});

		it("should return the correct headers when allowedHeaders is *", (): void => {
			// eslint-disable-next-line @ts/prefer-as-const
			const allowedHeaders: "*" = "*";
			const allowedOrigins: Array<string> = ["http://localhost:3000", "https://example.com"];
			const maxAge: number = 3600;

			const accessControlDefinition: AccessControlDefinition = new AccessControlDefinition({
				allowedHeaders: allowedHeaders,
				allowedOrigins: allowedOrigins,
				maxAge: maxAge,
			});

			const headers: Headers = accessControlDefinition.generatePreflightHeaders();

			const expectedHeaders: Headers = new Headers();

			expectedHeaders.set("Access-Control-Allow-Headers", "*");
			expectedHeaders.set("Access-Control-Allow-Origin", allowedOrigins.join(", "));
			expectedHeaders.set("Access-Control-Max-Age", maxAge.toString());
			expectedHeaders.set("Content-Length", "0");

			deepStrictEqual(headers, expectedHeaders);
		});

		it("should return the correct headers when allowedOrigins is *", (): void => {
			const allowedHeaders: Array<string> = ["Content-Type", "Authorization"];
			// eslint-disable-next-line @ts/prefer-as-const
			const allowedOrigins: "*" = "*";
			const maxAge: number = 3600;

			const accessControlDefinition: AccessControlDefinition = new AccessControlDefinition({
				allowedHeaders: allowedHeaders,
				allowedOrigins: allowedOrigins,
				maxAge: maxAge,
			});

			const headers: Headers = accessControlDefinition.generatePreflightHeaders();

			const expectedHeaders: Headers = new Headers();

			expectedHeaders.set("Access-Control-Allow-Headers", allowedHeaders.join(", "));
			expectedHeaders.set("Access-Control-Allow-Origin", "*");
			expectedHeaders.set("Access-Control-Max-Age", maxAge.toString());
			expectedHeaders.set("Content-Length", "0");

			deepStrictEqual(headers, expectedHeaders);
		});
	});
});
