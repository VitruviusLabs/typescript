
import { default as assert } from "node:assert/strict";

import { describe, it } from "node:test";

import { Kernel } from "../../src/Core/Kernel.mjs";

describe(
	"Kernel",
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
						assert.deepStrictEqual(Kernel.GetContextAccessor(), Kernel.ContextAccessor);
					}
				);
			}
		);

		describe(
			"GetExecutionContext",
			(): void =>
			{
				it(
					"should return undefined when called outside of an async hook",
					(): void =>
					{
						assert.strictEqual(Kernel.GetExecutionContext(), undefined);
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

				// 		Kernel.GetContextAccessor().run(
				// 			EXECUTION_CONTEXT,
				// 			(): void =>
				// 			{
				// 				expect(Kernel.GetExecutionContext()).to.deep.equal(EXECUTION_CONTEXT);
				// 			}
				// 		);
				// 	}
				// );
			}
		);
	}
);
