
import { default as assert } from "node:assert/strict";

import { describe, it } from "node:test";

import { ExecutionContext, ExecutionContextRegistry } from "../../src/_index.mjs";

describe(
	"ExecutionContextRegistry",
	(): void =>
	{
		describe(
			"GetContextAccessor",
			(): void =>
			{
				it(
					"should return the static ContextAccessor property when called",
					(): void =>
					{
						// @ts-expect-error - We need to access this private property for test purposes.
						assert.deepStrictEqual(ExecutionContextRegistry.GetContextAccessor(), ExecutionContextRegistry.ContextAccessor);
					}
				);
			}
		);

		describe(
			"GetExecutionContext",
			(): void =>
			{
				it(
					"should throw when called outside of an async hook",
					(): void =>
					{
						assert.throws(
							(): void =>
							{
								ExecutionContextRegistry.GetExecutionContext(ExecutionContext);
							}
						);
					}
				);

				// it(
				// 	"should return the defined AsyncLocalStorage store when called inside of an async hook",
				// 	(): void =>
				// 	{
				// 		const EXECUTION_CONTEXT: ExecutionContext = ExecutionContext.Create({
				// 			request: mockExpressRequest(),
				// 			response: mockExpressResponse()
				// 		});

				// 		ExecutionContextRegistry.GetContextAccessor().run(
				// 			EXECUTION_CONTEXT,
				// 			(): void =>
				// 			{
				// 				expect(ExecutionContextRegistry.GetExecutionContext()).to.deep.equal(EXECUTION_CONTEXT);
				// 			}
				// 		);
				// 	}
				// );
			}
		);
	}
);
