import { deepStrictEqual, doesNotThrow, throws } from "assert";

import { describe, it } from "node:test";

import { MockStorage } from "../../src/Utils/mockStorage.js";

import { testError } from "../common/utils.js";

import type { MockedDependency } from "../../src/Type/MockedDependency.js";

describe(
	"utils / MockStorage",
	(): void =>
	{
		it(
			"should successfully store the given mock",
			(): void =>
			{
				// @ts-expect-error: reset mocks
				MockStorage.Mocks = {};

				const MOCK: MockedDependency = { name: "test" };

				const WRAPPER = (): void =>
				{
					MockStorage.Set("test", MOCK);
				};

				doesNotThrow(WRAPPER);

				// @ts-expect-error: test mocks
				deepStrictEqual(MockStorage.Mocks, { test: MOCK });
			}
		);

		it(
			"should give back a stored mock",
			(): void =>
			{
				const MOCK: MockedDependency = { name: "test" };

				// @ts-expect-error: reset mocks
				MockStorage.Mocks = { test: MOCK };

				const WRAPPER = (): void =>
				{
					MockStorage.Get("test");
				};

				doesNotThrow(WRAPPER);

				const RESULT: unknown = MockStorage.Get("test");

				deepStrictEqual(RESULT, MOCK);
			}
		);

		it(
			"should throw when requesting an unknown mock",
			(): void =>
			{
				// @ts-expect-error: reset mocks
				MockStorage.Mocks = {};

				const WRAPPER = (): void =>
				{
					MockStorage.Get("unknown");
				};

				throws(WRAPPER, testError);
			}
		);

		it(
			"should successfully remove a stored mock",
			(): void =>
			{
				const MOCK: MockedDependency = { name: "test" };

				// @ts-expect-error: reset mocks
				MockStorage.Mocks = { test: MOCK };

				const WRAPPER = (): void =>
				{
					MockStorage.Remove("test");
				};

				doesNotThrow(WRAPPER);

				// @ts-expect-error: test mocks
				deepStrictEqual(MockStorage.Mocks, {});
			}
		);
	}
);
