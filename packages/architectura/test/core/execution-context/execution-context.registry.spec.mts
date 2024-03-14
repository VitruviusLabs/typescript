import { deepStrictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { ExecutionContextRegistry } from "../../../src/_index.mjs";

describe("ExecutionContextRegistry", (): void => {
	describe("GetContextAccessor", (): void => {
		it("should return the static ContextAccessor property when called", (): void =>
		{
			// @ts-expect-error - We need to access this private property for test purposes.
			deepStrictEqual(ExecutionContextRegistry.GetContextAccessor(), ExecutionContextRegistry.ContextAccessor);
		});
	});

	describe("GetExecutionContext", (): void => {
		it("should throw when called outside of an async hook", (): void => {
			throws(
				(): void => {
					ExecutionContextRegistry.GetExecutionContext();
				}
			);
		});
	});
});
