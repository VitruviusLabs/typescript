import { describe, it } from "node:test";
import { doesNotThrow, throws } from "node:assert";
import { createErrorTest, getAllValues } from "@vitruvius-labs/testing-ground";
import { assertHeader } from "../../../../src/service/jwt/helper/assert-header.mjs";

describe(
	"assertHeader",
	(): void =>
	{
		it(
			'should return when given a record with an "alg" property with a string value',
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					assertHeader({ alg: "RSA-SHA256" });
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getAllValues();

				for (const VALUE of VALUES)
				{
					const WRAPPER = (): void =>
					{
						assertHeader(VALUE);
					};

					throws(WRAPPER, createErrorTest());
				}
			}
		);
	}
);
