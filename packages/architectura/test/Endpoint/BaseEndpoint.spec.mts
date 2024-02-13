import { default as assert } from "node:assert/strict";

import { describe, it } from "node:test";

import { BaseEndpoint } from "../../src/Endpoint/BaseEndpoint.mjs";

describe(
	"BaseEndpoint",
	(): void =>
	{
		describe(
			"Execute",
			(): void =>
			{
				it(
					"should exist but do nothing when called",
					(): void =>
					{
						assert.doesNotThrow(BaseEndpoint.Execute);
					}
				);
			}
		);

		describe(
			"GetMethod",
			(): void =>
			{
				it(
					"should return the static METHOD property when called",
					(): void =>
					{
						// @ts-expect-error - We need to access this private property for test purposes.
						assert.strictEqual(BaseEndpoint.GetMethod(), BaseEndpoint.METHOD);
					}
				);
			}
		);

		describe(
			"GetRoute",
			(): void =>
			{
				it(
					"should return the static ROUTE property when called",
					(): void =>
					{
						// @ts-expect-error - We need to access this private property for test purposes.
						assert.strictEqual(BaseEndpoint.GetRoute(), BaseEndpoint.ROUTE);
					}
				);
			}
		);
	}
);
