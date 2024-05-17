import { deepStrictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { ExecutionContext, type ExecutionContextInstantiationInterface, ExecutionContextRegistry } from "../../../src/_index.mjs";

describe("ExecutionContextRegistry", (): void => {
	describe("GetExecutionContext", (): void => {
		it("should throw when called outside of an async hook", (): void => {
			const WRAPPER = (): void =>
			{
				ExecutionContextRegistry.GetExecutionContext();
			};

			throws(WRAPPER);
		});

		it("should return a context when called inside of an async hook", (): void => {
			const PARAMETERS: ExecutionContextInstantiationInterface = {
				// @ts-expect-error: Dummy value for testing purposes.
				request: Symbol("request"),
				// @ts-expect-error: Dummy value for testing purposes.
				response: Symbol("response"),
			};

			const CONTEXT: ExecutionContext = new ExecutionContext(PARAMETERS);

			ExecutionContextRegistry.SetExecutionContext(CONTEXT);

			deepStrictEqual(ExecutionContextRegistry.GetExecutionContext(), CONTEXT);
		});
	});
});
