import { describe, it } from "node:test";
import { doesNotThrow, throws } from "node:assert";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { validateClaims } from "../../../../src/service/jwt/utility/validate-claims.mjs";

describe(
	"validateClaims",
	(): void =>
	{
		it(
			"should return when given empty claims",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateClaims({});
				};

				doesNotThrow(WRAPPER, createErrorTest());
			}
		);

		it(
			"should return when given claims issued in the past",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateClaims({ iat: Date.now() - 1000 });
				};

				doesNotThrow(WRAPPER, createErrorTest());
			}
		);

		it(
			"should throw when given claims issued in the future",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateClaims({ iat: Date.now() + 1000 });
				};

				throws(WRAPPER, createErrorTest());
			}
		);

		it(
			"should return when given claims already active",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateClaims({ nbf: Date.now() - 1000 });
				};

				doesNotThrow(WRAPPER, createErrorTest());
			}
		);

		it(
			"should return when given claims not yet active but told to skip the check",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateClaims({ nbf: Date.now() + 1000 }, false);
				};

				doesNotThrow(WRAPPER, createErrorTest());
			}
		);

		it(
			"should throw when given claims not yet active",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateClaims({ nbf: Date.now() + 1000 });
				};

				throws(WRAPPER, createErrorTest());
			}
		);

		it(
			"should return when given claims that is not expired yet",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateClaims({ exp: Date.now() + 1000 });
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when given claims that is expired",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateClaims({ exp: Date.now() - 1000 });
				};

				throws(WRAPPER, createErrorTest());
			}
		);

		it(
			"should throw when given claims that is active before being issued",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateClaims({ iat: Date.now(), nbf: Date.now() - 1000 });
				};

				throws(WRAPPER, createErrorTest());
			}
		);

		it(
			"should throw when given claims that is issued already expired",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateClaims({ iat: Date.now(), exp: Date.now() - 2000 });
				};

				throws(WRAPPER, createErrorTest());
			}
		);

		it(
			"should throw when given claims that is active after it expires",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					validateClaims({ nbf: Date.now() - 1000, exp: Date.now() - 2000 });
				};

				throws(WRAPPER, createErrorTest());
			}
		);
	}
);
