import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { JWT } from "../../../src/service/jwt/_index.mjs";
import { JWTService } from "../../../src/service/jwt/jwt.service.mjs";

describe(
	"JWTService",
	(): void =>
	{
		it(
			"should be able to create, encoded, and parse a JWT",
			(): void =>
			{
				const JWT_OBJECT: JWT = new JWT("RSA-SHA256", "your-256-bit-secret-here", {});

				const ENCODED_JWT: string = JWT_OBJECT.toString();

				const PARSED_JWT: JWT = JWTService.Parse(ENCODED_JWT, "your-256-bit-secret-here");

				deepStrictEqual(PARSED_JWT, JWT_OBJECT);
			}
		);
	}
);
