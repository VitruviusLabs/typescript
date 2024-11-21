import { afterEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotThrow, throws } from "node:assert";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { ReflectUtility } from "@vitruvius-labs/toolbox";
import { BaseErrorHook, BasePostHook, BasePreHook, HookRegistry } from "../../../src/_index.mjs";

describe("HookRegistry", (): void => {
	afterEach((): void => {
		ReflectUtility.Set(HookRegistry, "PRE_HOOKS", []);
		ReflectUtility.Set(HookRegistry, "POST_HOOKS", []);
		ReflectUtility.Set(HookRegistry, "ERROR_HOOKS", []);
	});

	describe("GetPreHooks", (): void => {
		it("should return the registered pre hooks", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			ReflectUtility.Set(HookRegistry, "PRE_HOOKS", [DummyPreHook, new DummyPreHook()]);

			deepStrictEqual(HookRegistry.GetPreHooks(), [DummyPreHook, new DummyPreHook()]);
		});
	});

	describe("AddPreHook", (): void => {
		it("should add a pre hook (constructor)", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			HookRegistry.AddPreHook(DummyPreHook);

			deepStrictEqual(HookRegistry["PRE_HOOKS"], [DummyPreHook]);
		});

		it("should add a pre hook (instance)", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyPreHook = new DummyPreHook();

			HookRegistry.AddPreHook(HOOK);

			deepStrictEqual(HookRegistry["PRE_HOOKS"], [HOOK]);
		});

		it("should throw when a pre hook constructor is added more than once", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const WRAPPER = (): void => {
				HookRegistry.AddPreHook(DummyPreHook);
			};

			doesNotThrow(WRAPPER);
			throws(WRAPPER, createErrorTest());
		});
	});

	describe("GetPostHooks", (): void => {
		it("should return the registered post hooks", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public async execute(): Promise<void> { }
			}

			ReflectUtility.Set(HookRegistry, "POST_HOOKS", [DummyPostHook, new DummyPostHook()]);

			deepStrictEqual(HookRegistry.GetPostHooks(), [DummyPostHook, new DummyPostHook()]);
		});
	});

	describe("AddPostHook", (): void => {
		it("should add a post hook (constructor)", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public async execute(): Promise<void> { }
			}

			HookRegistry.AddPostHook(DummyPostHook);

			deepStrictEqual(HookRegistry["POST_HOOKS"], [DummyPostHook]);
		});

		it("should add a post hook (instance)", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyPostHook = new DummyPostHook();

			HookRegistry.AddPostHook(HOOK);

			deepStrictEqual(HookRegistry["POST_HOOKS"], [HOOK]);
		});

		it("should throw when a post hook constructor is added more than once", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public async execute(): Promise<void> { }
			}

			const WRAPPER = (): void => {
				HookRegistry.AddPostHook(DummyPostHook);
			};

			doesNotThrow(WRAPPER);
			throws(WRAPPER, createErrorTest());
		});
	});

	describe("GetErrorHooks", (): void => {
		it("should return the registered error hooks", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public async execute(): Promise<void> { }
			}

			ReflectUtility.Set(HookRegistry, "ERROR_HOOKS", [DummyErrorHook, new DummyErrorHook()]);

			deepStrictEqual(HookRegistry.GetErrorHooks(), [DummyErrorHook, new DummyErrorHook()]);
		});
	});

	describe("AddErrorHook", (): void => {
		it("should add a error hook (constructor)", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public async execute(): Promise<void> { }
			}

			HookRegistry.AddErrorHook(DummyErrorHook);

			deepStrictEqual(HookRegistry["ERROR_HOOKS"], [DummyErrorHook]);
		});

		it("should add a error hook (instance)", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyErrorHook = new DummyErrorHook();

			HookRegistry.AddErrorHook(HOOK);

			deepStrictEqual(HookRegistry["ERROR_HOOKS"], [HOOK]);
		});

		it("should throw when a error hook constructor is added more than once", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public async execute(): Promise<void> { }
			}

			const WRAPPER = (): void => {
				HookRegistry.AddErrorHook(DummyErrorHook);
			};

			doesNotThrow(WRAPPER);
			throws(WRAPPER, createErrorTest());
		});
	});

	describe("AddHooksDirectory", (): void => {
		it.skip("should explore a folder recursively and add hooks to the registry", async (): Promise<void> => {});
	});
});
