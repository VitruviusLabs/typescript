import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, fail, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { instanceOf } from "@vitruvius-labs/toolbox";
import { BaseEndpoint, BaseErrorHook, BasePostHook, BasePreHook, HTTPMethodEnum, HookRegistry, HookService, type HooksInterface } from "../../../src/_index.mjs";
import { type MockContextInterface, mockContext } from "../../../mock/core/_index.mjs";

describe("HookService", (): void => {
	// @ts-expect-error: Stubbing a private method
	const INSTANTIATE_HOOK_STUB: SinonStub = stub(HookService, "InstantiateHook");
	// @ts-expect-error: Stubbing a private method
	const RUN_HOOKS_STUB: SinonStub = stub(HookService, "RunHooks");
	const GET_PRE_HOOKS_STUB: SinonStub = stub(HookRegistry, "GetPreHooks");
	const GET_POST_HOOKS_STUB: SinonStub = stub(HookRegistry, "GetPostHooks");
	const GET_ERROR_HOOKS_STUB: SinonStub = stub(HookRegistry, "GetErrorHooks");

	beforeEach((): void => {
		INSTANTIATE_HOOK_STUB.reset();
		INSTANTIATE_HOOK_STUB.callThrough();
		RUN_HOOKS_STUB.reset();
		RUN_HOOKS_STUB.callThrough();
		GET_PRE_HOOKS_STUB.reset();
		GET_PRE_HOOKS_STUB.callThrough();
		GET_POST_HOOKS_STUB.reset();
		GET_POST_HOOKS_STUB.callThrough();
		GET_ERROR_HOOKS_STUB.reset();
		GET_ERROR_HOOKS_STUB.callThrough();
	});

	after((): void => {
		INSTANTIATE_HOOK_STUB.restore();
		RUN_HOOKS_STUB.restore();
		GET_PRE_HOOKS_STUB.restore();
		GET_POST_HOOKS_STUB.restore();
		GET_ERROR_HOOKS_STUB.restore();
	});

	describe("InstantiateHook", (): void => {
		it("should return a pre-hook instance as is", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyPreHook = new DummyPreHook();

			strictEqual(HookService["InstantiateHook"](HOOK), HOOK);
		});

		it("should instantiate a pre-hook class", (): void => {
			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			deepStrictEqual(HookService["InstantiateHook"](DummyPreHook), new DummyPreHook());
		});

		it("should return a post-hook instance as is", (): void => {
			class DummyPostHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyPostHook = new DummyPostHook();

			strictEqual(HookService["InstantiateHook"](HOOK), HOOK);
		});

		it("should instantiate a post-hook class", (): void => {
			class DummyPostHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			deepStrictEqual(HookService["InstantiateHook"](DummyPostHook), new DummyPostHook());
		});

		it("should return an error hook instance as is", (): void => {
			class DummyErrorHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyErrorHook = new DummyErrorHook();

			strictEqual(HookService["InstantiateHook"](HOOK), HOOK);
		});

		it("should instantiate an error hook class", (): void => {
			class DummyErrorHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			deepStrictEqual(HookService["InstantiateHook"](DummyErrorHook), new DummyErrorHook());
		});
	});

	describe("RunHooks", (): void => {
		it("should run all global, unless excluded, and local hooks using the provided runner", async (): Promise<void> => {
			class DummyHook extends BasePreHook
			{
				public override execute(): void {}
			}

			class ExcludedHook extends BasePreHook
			{
				public override execute(): void {}
			}

			const DUMMY_HOOK: DummyHook = new DummyHook();
			const IGNORED_HOOK: ExcludedHook = new ExcludedHook();

			const RUNNER_STUB: SinonStub = stub();

			const PARAMETERS: HooksInterface<BasePreHook> = {
				global: [DUMMY_HOOK, IGNORED_HOOK],
				excluded: [ExcludedHook],
				local: [DUMMY_HOOK, IGNORED_HOOK],
			};

			const RESULT: unknown = HookService["RunHooks"](PARAMETERS, RUNNER_STUB);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(INSTANTIATE_HOOK_STUB.callCount, 4, "'HookService.InstantiateHook' should have been called exactly four times");
			deepStrictEqual(INSTANTIATE_HOOK_STUB.getCall(0).args, [DUMMY_HOOK], "'HookService.InstantiateHook' should have been called with the first global hook on the first call");
			deepStrictEqual(INSTANTIATE_HOOK_STUB.getCall(1).args, [IGNORED_HOOK], "'HookService.InstantiateHook' should have been called with the second global hook on the second call");
			deepStrictEqual(INSTANTIATE_HOOK_STUB.getCall(2).args, [DUMMY_HOOK], "'HookService.InstantiateHook' should have been called with the first local hook on the third call");
			deepStrictEqual(INSTANTIATE_HOOK_STUB.getCall(3).args, [IGNORED_HOOK], "'HookService.InstantiateHook' should have been called with the second local hook on the fourth call");
			strictEqual(RUNNER_STUB.callCount, 3, "The provided runner should have been called exactly three times");
			deepStrictEqual(RUNNER_STUB.getCall(0).args, [DUMMY_HOOK], "The provided runner should have been called with the first global hook on the first call");
			deepStrictEqual(RUNNER_STUB.getCall(1).args, [DUMMY_HOOK], "The provided runner should have been called with the first local hook on the second call");
			deepStrictEqual(RUNNER_STUB.getCall(2).args, [IGNORED_HOOK], "The provided runner should have been called with the second local hook on the third call");
		});
	});

	describe("RunPreHooks", (): void => {
		it("should call the 'RunHooks' method with all the necessary parameters", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			class DummyHook extends BasePreHook
			{
				public override execute(): void {}
			}

			class ExcludedHook extends BasePreHook
			{
				public override execute(): void {}
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const DUMMY_HOOK: DummyHook = new DummyHook();
			const IGNORED_HOOK: ExcludedHook = new ExcludedHook();
			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const GET_LOCAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getPreHooks");
			const GET_EXCLUDED_GLOBAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getExcludedGlobalPreHooks");
			const HOOK_EXECUTE_STUB: SinonStub = stub(DUMMY_HOOK, "execute");

			GET_PRE_HOOKS_STUB.returns([DUMMY_HOOK, IGNORED_HOOK]);
			GET_LOCAL_HOOKS_STUB.returns([DUMMY_HOOK, IGNORED_HOOK]);
			GET_EXCLUDED_GLOBAL_HOOKS_STUB.returns([ExcludedHook]);
			RUN_HOOKS_STUB.resolves();
			HOOK_EXECUTE_STUB.resolves();

			const EXPECTED_HOOKS: HooksInterface<BasePreHook> = {
				global: [DUMMY_HOOK, IGNORED_HOOK],
				excluded: [ExcludedHook],
				local: [DUMMY_HOOK, IGNORED_HOOK],
			};

			const RESULT: unknown = HookService.RunPreHooks(ENDPOINT, CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(GET_PRE_HOOKS_STUB.callCount, 1, "'HookRegistry.GetPreHooks' should have been called exactly once");
			strictEqual(GET_LOCAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getPreHooks' should have been called exactly once");
			strictEqual(GET_EXCLUDED_GLOBAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getExcludedGlobalPreHooks' should have been called exactly once");

			strictEqual(RUN_HOOKS_STUB.callCount, 1, "The 'RunHooks' method should have been called exactly once");

			strictEqual(RUN_HOOKS_STUB.firstCall.args.length, 2, "The 'RunHooks' method should have been called with two parameters");
			deepStrictEqual(RUN_HOOKS_STUB.firstCall.args[0], EXPECTED_HOOKS);

			const RUNNER: unknown = RUN_HOOKS_STUB.firstCall.args[1];

			if (typeof RUNNER !== "function")
			{
				fail("The 'RunHooks' method should have been called with a function as second parameter");
			}

			const RUNNER_RESULT: unknown = RUNNER(DUMMY_HOOK);

			instanceOf(RUNNER_RESULT, Promise);
			await doesNotReject(RUNNER_RESULT);
			strictEqual(HOOK_EXECUTE_STUB.callCount, 1, "The hook runner should have been called the hook method 'execute' exactly once");
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
		});
	});

	describe("RunPostHooks", (): void => {
		it("should call the 'RunHooks' method with all the necessary parameters", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			class DummyHook extends BasePostHook
			{
				public override execute(): void {}
			}

			class ExcludedHook extends BasePostHook
			{
				public override execute(): void {}
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const DUMMY_HOOK: DummyHook = new DummyHook();
			const IGNORED_HOOK: ExcludedHook = new ExcludedHook();
			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const GET_LOCAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getPostHooks");
			const GET_EXCLUDED_GLOBAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getExcludedGlobalPostHooks");
			const HOOK_EXECUTE_STUB: SinonStub = stub(DUMMY_HOOK, "execute");

			GET_POST_HOOKS_STUB.returns([DUMMY_HOOK, IGNORED_HOOK]);
			GET_LOCAL_HOOKS_STUB.returns([DUMMY_HOOK, IGNORED_HOOK]);
			GET_EXCLUDED_GLOBAL_HOOKS_STUB.returns([ExcludedHook]);
			RUN_HOOKS_STUB.resolves();
			HOOK_EXECUTE_STUB.resolves();

			const EXPECTED_HOOKS: HooksInterface<BasePostHook> = {
				global: [DUMMY_HOOK, IGNORED_HOOK],
				excluded: [ExcludedHook],
				local: [DUMMY_HOOK, IGNORED_HOOK],
			};

			const RESULT: unknown = HookService.RunPostHooks(ENDPOINT, CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(GET_POST_HOOKS_STUB.callCount, 1, "'HookRegistry.GetPostHooks' should have been called exactly once");
			strictEqual(GET_LOCAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getPostHooks' should have been called exactly once");
			strictEqual(GET_EXCLUDED_GLOBAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getExcludedGlobalPostHooks' should have been called exactly once");

			strictEqual(RUN_HOOKS_STUB.callCount, 1, "The 'RunHooks' method should have been called exactly once");

			strictEqual(RUN_HOOKS_STUB.firstCall.args.length, 2, "The 'RunHooks' method should have been called with two parameters");
			deepStrictEqual(RUN_HOOKS_STUB.firstCall.args[0], EXPECTED_HOOKS);

			const RUNNER: unknown = RUN_HOOKS_STUB.firstCall.args[1];

			if (typeof RUNNER !== "function")
			{
				fail("The 'RunHooks' method should have been called with a function as second parameter");
			}

			const RUNNER_RESULT: unknown = RUNNER(DUMMY_HOOK);

			instanceOf(RUNNER_RESULT, Promise);
			await doesNotReject(RUNNER_RESULT);
			strictEqual(HOOK_EXECUTE_STUB.callCount, 1, "The hook runner should have been called the hook method 'execute' exactly once");
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
		});
	});

	describe("RunErrorHooks", (): void => {
		it("should call the 'RunHooks' method with all the necessary parameters", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			class DummyHook extends BaseErrorHook
			{
				public override execute(): void {}
			}

			class ExcludedHook extends BaseErrorHook
			{
				public override execute(): void {}
			}

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const DUMMY_HOOK: DummyHook = new DummyHook();
			const IGNORED_HOOK: ExcludedHook = new ExcludedHook();
			const ENDPOINT: DummyEndpoint = new DummyEndpoint();
			const ERROR: Error = new Error("Test");

			const GET_LOCAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getErrorHooks");
			const GET_EXCLUDED_GLOBAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getExcludedGlobalErrorHooks");
			const HOOK_EXECUTE_STUB: SinonStub = stub(DUMMY_HOOK, "execute");

			GET_ERROR_HOOKS_STUB.returns([DUMMY_HOOK, IGNORED_HOOK]);
			GET_LOCAL_HOOKS_STUB.returns([DUMMY_HOOK, IGNORED_HOOK]);
			GET_EXCLUDED_GLOBAL_HOOKS_STUB.returns([ExcludedHook]);
			RUN_HOOKS_STUB.resolves();
			HOOK_EXECUTE_STUB.resolves();

			const EXPECTED_HOOKS: HooksInterface<BaseErrorHook> = {
				global: [DUMMY_HOOK, IGNORED_HOOK],
				excluded: [ExcludedHook],
				local: [DUMMY_HOOK, IGNORED_HOOK],
			};

			const RESULT: unknown = HookService.RunErrorHooks(ENDPOINT, CONTEXT_MOCK.instance, ERROR);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(GET_ERROR_HOOKS_STUB.callCount, 1, "'HookRegistry.GetErrorHooks' should have been called exactly once");
			strictEqual(GET_LOCAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getErrorHooks' should have been called exactly once");
			strictEqual(GET_EXCLUDED_GLOBAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getExcludedGlobalErrorHooks' should have been called exactly once");

			strictEqual(RUN_HOOKS_STUB.callCount, 1, "The 'RunHooks' method should have been called exactly once");

			strictEqual(RUN_HOOKS_STUB.firstCall.args.length, 2, "The 'RunHooks' method should have been called with two parameters");
			deepStrictEqual(RUN_HOOKS_STUB.firstCall.args[0], EXPECTED_HOOKS);

			const RUNNER: unknown = RUN_HOOKS_STUB.firstCall.args[1];

			if (typeof RUNNER !== "function")
			{
				fail("The 'RunHooks' method should have been called with a function as second parameter");
			}

			const RUNNER_RESULT: unknown = RUNNER(DUMMY_HOOK);

			instanceOf(RUNNER_RESULT, Promise);
			await doesNotReject(RUNNER_RESULT);
			strictEqual(HOOK_EXECUTE_STUB.callCount, 1, "The hook runner should have been called the hook method 'execute' exactly once");
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.args, [CONTEXT_MOCK.instance, ERROR]);
		});
	});

	describe("RunFallbackErrorHooks", (): void => {
		it("should call the 'RunHooks' method with all the necessary parameters", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			class DummyHook extends BaseErrorHook
			{
				public override execute(): void {}
			}

			const DUMMY_HOOK: DummyHook = new DummyHook();
			const ERROR: Error = new Error("Test");

			const HOOK_EXECUTE_STUB: SinonStub = stub(DUMMY_HOOK, "execute");

			GET_ERROR_HOOKS_STUB.returns([DUMMY_HOOK]);
			RUN_HOOKS_STUB.resolves();
			HOOK_EXECUTE_STUB.resolves();

			const EXPECTED_HOOKS: HooksInterface<BaseErrorHook> = {
				global: [DUMMY_HOOK],
				excluded: [],
				local: [],
			};

			const RESULT: unknown = HookService.RunFallbackErrorHooks(CONTEXT_MOCK.instance, ERROR);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(GET_ERROR_HOOKS_STUB.callCount, 1, "'HookRegistry.GetErrorHooks' should have been called exactly once");

			strictEqual(RUN_HOOKS_STUB.callCount, 1, "The 'RunHooks' method should have been called exactly once");

			strictEqual(RUN_HOOKS_STUB.firstCall.args.length, 2, "The 'RunHooks' method should have been called with two parameters");
			deepStrictEqual(RUN_HOOKS_STUB.firstCall.args[0], EXPECTED_HOOKS);

			const RUNNER: unknown = RUN_HOOKS_STUB.firstCall.args[1];

			if (typeof RUNNER !== "function")
			{
				fail("The 'RunHooks' method should have been called with a function as second parameter");
			}

			const RUNNER_RESULT: unknown = RUNNER(DUMMY_HOOK);

			instanceOf(RUNNER_RESULT, Promise);
			await doesNotReject(RUNNER_RESULT);
			strictEqual(HOOK_EXECUTE_STUB.callCount, 1, "The hook runner should have been called the hook method 'execute' exactly once");
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.args, [CONTEXT_MOCK.instance, ERROR]);
		});
	});
});
