import { default as assert } from "node:assert/strict";
import { describe, it } from "node:test";
import { ExecutionContext, ExecutionContextRegistry } from "../../../src/_index.mjs";

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
			}
		);
	}
);
