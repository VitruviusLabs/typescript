import type { MockedDependency } from "../../src/definition/interface/mocked-dependency.mjs";
import { deepStrictEqual, doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { MockStorage } from "../../src/utils/mock-storage.mjs";

describe("utils / MockStorage", (): void => {
	it("should successfully store the given mock", (): void => {
		// @ts-expect-error: reset mocks
		MockStorage.Mocks.clear();

		const MOCK: MockedDependency = { name: "test" };

		const WRAPPER = (): void =>
		{
			MockStorage.Set("test", MOCK);
		};

		doesNotThrow(WRAPPER);

		// @ts-expect-error: test mocks
		deepStrictEqual(MockStorage.Mocks, new Map([["test", MOCK]]));
	});

	it("should give back a stored mock", (): void => {
		const MOCK: MockedDependency = { name: "test" };

		// @ts-expect-error: reset mocks
		MockStorage.Mocks.clear();
		// @ts-expect-error: reset mocks
		MockStorage.Mocks.set("test", MOCK);

		const WRAPPER = (): void =>
		{
			MockStorage.Get("test");
		};

		doesNotThrow(WRAPPER);

		const RESULT: unknown = MockStorage.Get("test");

		deepStrictEqual(RESULT, MOCK);
	});

	it("should throw when requesting an unknown mock", (): void => {
		// @ts-expect-error: reset mocks
		MockStorage.Mocks.clear();

		const WRAPPER = (): void =>
		{
			MockStorage.Get("unknown");
		};

		throws(WRAPPER, createErrorTest());
	});

	it("should successfully remove a stored mock", (): void => {
		const MOCK: MockedDependency = { name: "test" };

		// @ts-expect-error: reset mocks
		MockStorage.Mocks.clear();
		// @ts-expect-error: reset mocks
		MockStorage.Mocks.set("test", MOCK);

		const WRAPPER = (): void =>
		{
			MockStorage.Remove("test");
		};

		doesNotThrow(WRAPPER);

		// @ts-expect-error: test mocks
		deepStrictEqual(MockStorage.Mocks, new Map());
	});
});
