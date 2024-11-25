import { describe, it } from "node:test";
import { doesNotThrow, strictEqual, throws } from "node:assert";
import { ReflectUtility } from "@vitruvius-labs/toolbox";
import { BasePostHook } from "../../../src/_index.mjs";
import { type MockContextInterface, mockContext } from "../../../mock/_index.mjs";

describe("BasePostHook", (): void => {
	describe("getContext", (): void => {
		it("should throw if there's no context", (): void => {
			class DummyHook extends BasePostHook
			{
				public execute(): void { }
			}

			const HOOK: DummyHook = new DummyHook();

			const WRAPPER = (): void => {
				HOOK["getContext"]();
			};

			throws(WRAPPER, new Error("This is not a contextual post-hook."));
		});

		it("should return the context", (): void => {
			const MOCK_CONTEXT: MockContextInterface = mockContext();

			class DummyHook extends BasePostHook
			{
				public execute(): void { }
			}

			const HOOK: DummyHook = new DummyHook();

			ReflectUtility.Set(HOOK, "context", MOCK_CONTEXT.instance);

			let result: unknown = undefined;

			const WRAPPER = (): void => {
				result = HOOK["getContext"]();
			};

			doesNotThrow(WRAPPER);
			strictEqual(result, MOCK_CONTEXT.instance);
		});
	});
});
