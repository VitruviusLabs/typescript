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

			ReflectUtility.Set(HookRegistry, "PRE_HOOKS", [new DummyPreHook()]);

			deepStrictEqual(HookRegistry.GetPreHooks(), [new DummyPreHook()]);
		});

		it("should instantiate pre hook constructors", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			ReflectUtility.Set(HookRegistry, "PRE_HOOKS", [DummyPreHook]);

			deepStrictEqual(HookRegistry.GetPreHooks(), [new DummyPreHook()]);
		});
	});

	describe("AddPreHook", (): void => {
		it("should add a pre hook (constructor)", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			HookRegistry.AddPreHook(DummyPreHook);

			deepStrictEqual(ReflectUtility.Get(HookRegistry, "PRE_HOOKS"), [DummyPreHook]);
		});

		it("should add a pre hook (instance)", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyPreHook = new DummyPreHook();

			HookRegistry.AddPreHook(HOOK);

			deepStrictEqual(ReflectUtility.Get(HookRegistry, "PRE_HOOKS"), [HOOK]);
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

			ReflectUtility.Set(HookRegistry, "POST_HOOKS", [new DummyPostHook()]);

			deepStrictEqual(HookRegistry.GetPostHooks(), [new DummyPostHook()]);
		});

		it("should instantiate post hook constructors", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public async execute(): Promise<void> { }
			}

			ReflectUtility.Set(HookRegistry, "POST_HOOKS", [DummyPostHook]);

			deepStrictEqual(HookRegistry.GetPostHooks(), [new DummyPostHook()]);
		});
	});

	describe("AddPostHook", (): void => {
		it("should add a post hook (constructor)", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public async execute(): Promise<void> { }
			}

			HookRegistry.AddPostHook(DummyPostHook);

			deepStrictEqual(ReflectUtility.Get(HookRegistry, "POST_HOOKS"), [DummyPostHook]);
		});

		it("should add a post hook (instance)", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyPostHook = new DummyPostHook();

			HookRegistry.AddPostHook(HOOK);

			deepStrictEqual(ReflectUtility.Get(HookRegistry, "POST_HOOKS"), [HOOK]);
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

			ReflectUtility.Set(HookRegistry, "ERROR_HOOKS", [new DummyErrorHook()]);

			deepStrictEqual(HookRegistry.GetErrorHooks(), [new DummyErrorHook()]);
		});

		it("should instantiate error hook constructors", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public async execute(): Promise<void> { }
			}

			ReflectUtility.Set(HookRegistry, "ERROR_HOOKS", [DummyErrorHook]);

			deepStrictEqual(HookRegistry.GetErrorHooks(), [new DummyErrorHook()]);
		});
	});

	describe("AddErrorHook", (): void => {
		it("should add a error hook (constructor)", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public async execute(): Promise<void> { }
			}

			HookRegistry.AddErrorHook(DummyErrorHook);

			deepStrictEqual(ReflectUtility.Get(HookRegistry, "ERROR_HOOKS"), [DummyErrorHook]);
		});

		it("should add a error hook (instance)", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyErrorHook = new DummyErrorHook();

			HookRegistry.AddErrorHook(HOOK);

			deepStrictEqual(ReflectUtility.Get(HookRegistry, "ERROR_HOOKS"), [HOOK]);
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
