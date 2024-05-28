import { afterEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotThrow, throws } from "node:assert";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { BaseErrorHook, BasePostHook, BasePreHook, HookRegistry } from "../../../src/_index.mjs";

describe("HookRegistry", (): void => {
	afterEach((): void => {
		Reflect.set(HookRegistry, "PRE_HOOKS", []);
		Reflect.set(HookRegistry, "POST_HOOKS", []);
		Reflect.set(HookRegistry, "ERROR_HOOKS", []);
	});

	describe("GetPreHooks", (): void => {
		it("should return the registered pre hooks", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			Reflect.set(HookRegistry, "PRE_HOOKS", [new DummyPreHook()]);

			deepStrictEqual(HookRegistry.GetPreHooks(), [new DummyPreHook()]);
		});

		it("should instantiate pre hook constructors", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			Reflect.set(HookRegistry, "PRE_HOOKS", [DummyPreHook]);

			deepStrictEqual(HookRegistry.GetPreHooks(), [new DummyPreHook()]);
		});
	});

	describe("AddPreHook", (): void => {
		it("should add a pre hook", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			HookRegistry.AddPreHook(DummyPreHook);

			deepStrictEqual(Reflect.get(HookRegistry, "PRE_HOOKS"), [DummyPreHook]);
		});

		it("should throw when a pre hook is added more than once", (): void => {
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

			Reflect.set(HookRegistry, "POST_HOOKS", [new DummyPostHook()]);

			deepStrictEqual(HookRegistry.GetPostHooks(), [new DummyPostHook()]);
		});

		it("should instantiate post hook constructors", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public async execute(): Promise<void> { }
			}

			Reflect.set(HookRegistry, "POST_HOOKS", [DummyPostHook]);

			deepStrictEqual(HookRegistry.GetPostHooks(), [new DummyPostHook()]);
		});
	});

	describe("AddPostHook", (): void => {
		it("should add a post hook", (): void => {
			class DummyPostHook extends BasePostHook
			{
				public async execute(): Promise<void> { }
			}

			HookRegistry.AddPostHook(DummyPostHook);

			deepStrictEqual(Reflect.get(HookRegistry, "POST_HOOKS"), [DummyPostHook]);
		});

		it("should throw when a post hook is added more than once", (): void => {
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

			Reflect.set(HookRegistry, "ERROR_HOOKS", [new DummyErrorHook()]);

			deepStrictEqual(HookRegistry.GetErrorHooks(), [new DummyErrorHook()]);
		});

		it("should instantiate error hook constructors", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public async execute(): Promise<void> { }
			}

			Reflect.set(HookRegistry, "ERROR_HOOKS", [DummyErrorHook]);

			deepStrictEqual(HookRegistry.GetErrorHooks(), [new DummyErrorHook()]);
		});
	});

	describe("AddErrorHook", (): void => {
		it("should add a error hook", (): void => {
			class DummyErrorHook extends BaseErrorHook
			{
				public async execute(): Promise<void> { }
			}

			HookRegistry.AddErrorHook(DummyErrorHook);

			deepStrictEqual(Reflect.get(HookRegistry, "ERROR_HOOKS"), [DummyErrorHook]);
		});

		it("should throw when a error hook is added more than once", (): void => {
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
		it.todo("should explore a folder recursively and add hooks to the registry", async (): Promise<void> => {});
	});
});
