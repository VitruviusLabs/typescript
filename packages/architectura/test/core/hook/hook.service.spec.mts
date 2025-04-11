import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { instanceOf } from "@vitruvius-labs/toolbox";
import { BaseEndpoint, BaseErrorHook, BasePostHook, BasePreHook, type ExecutionContext, HTTPError, HTTPMethodEnum, HTTPStatusCodeEnum, HookRegistry, HookService, type HooksInterface, LoggerProxy } from "../../../src/_index.mjs";
import { mockContext } from "../../../mock/_index.mjs";

describe("HookService", (): void => {
	// @ts-expect-error: Stubbing a private method
	const INSTANTIATE_HOOK_STUB: SinonStub = stub(HookService, "InstantiateHook");
	// @ts-expect-error: Stubbing a private method
	const COMPILE_HOOKS_STUB: SinonStub = stub(HookService, "CompileHooks");
	// @ts-expect-error: Stubbing a private method
	const SPECIAL_ERROR_HANDLING_STUB: SinonStub = stub(HookService, "SpecialErrorHandling");
	const GET_PRE_HOOKS_STUB: SinonStub = stub(HookRegistry, "GetPreHooks");
	const GET_POST_HOOKS_STUB: SinonStub = stub(HookRegistry, "GetPostHooks");
	const GET_ERROR_HOOKS_STUB: SinonStub = stub(HookRegistry, "GetErrorHooks");
	const LOGGER_PROXY_ERROR_STUB: SinonStub = stub(LoggerProxy, "Error");

	beforeEach((): void => {
		INSTANTIATE_HOOK_STUB.reset();
		INSTANTIATE_HOOK_STUB.callThrough();
		COMPILE_HOOKS_STUB.reset();
		COMPILE_HOOKS_STUB.callThrough();
		SPECIAL_ERROR_HANDLING_STUB.reset();
		SPECIAL_ERROR_HANDLING_STUB.callThrough();
		GET_PRE_HOOKS_STUB.reset();
		GET_PRE_HOOKS_STUB.callThrough();
		GET_POST_HOOKS_STUB.reset();
		GET_POST_HOOKS_STUB.callThrough();
		GET_ERROR_HOOKS_STUB.reset();
		GET_ERROR_HOOKS_STUB.callThrough();
		LOGGER_PROXY_ERROR_STUB.reset();
		LOGGER_PROXY_ERROR_STUB.callThrough();
	});

	after((): void => {
		INSTANTIATE_HOOK_STUB.restore();
		COMPILE_HOOKS_STUB.restore();
		SPECIAL_ERROR_HANDLING_STUB.restore();
		GET_PRE_HOOKS_STUB.restore();
		GET_POST_HOOKS_STUB.restore();
		GET_ERROR_HOOKS_STUB.restore();
		LOGGER_PROXY_ERROR_STUB.restore();
	});

	describe("InstantiateHook", (): void => {
		it("should return a pre-hook instance as is", (): void => {
			const CONTEXT: ExecutionContext = mockContext().instance;

			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyPreHook = new DummyPreHook();

			const RESULT: unknown = HookService["InstantiateHook"](HOOK, CONTEXT);

			strictEqual(RESULT, HOOK);
			strictEqual(HOOK["context"], undefined);
		});

		it("should instantiate a pre-hook class and set its context property", (): void => {
			const CONTEXT: ExecutionContext = mockContext().instance;

			class DummyPreHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const EXPECTED: DummyPreHook = new DummyPreHook();

			// @ts-expect-error: Setting a readonly property for testing purposes
			EXPECTED["context"] = CONTEXT;

			const RESULT: unknown = HookService["InstantiateHook"](DummyPreHook, CONTEXT);

			deepStrictEqual(RESULT, EXPECTED);
		});

		it("should return a post-hook instance as is", (): void => {
			const CONTEXT: ExecutionContext = mockContext().instance;

			class DummyPostHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyPostHook = new DummyPostHook();

			const RESULT: unknown = HookService["InstantiateHook"](HOOK, CONTEXT);

			strictEqual(RESULT, HOOK);
			strictEqual(HOOK["context"], undefined);
		});

		it("should instantiate a post-hook class and set its context property", (): void => {
			const CONTEXT: ExecutionContext = mockContext().instance;

			class DummyPostHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const EXPECTED: DummyPostHook = new DummyPostHook();

			// @ts-expect-error: Setting a readonly property for testing purposes
			EXPECTED["context"] = CONTEXT;

			const RESULT: unknown = HookService["InstantiateHook"](DummyPostHook, CONTEXT);

			deepStrictEqual(RESULT, EXPECTED);
		});

		it("should return an error hook instance as is", (): void => {
			const CONTEXT: ExecutionContext = mockContext().instance;

			class DummyErrorHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const HOOK: DummyErrorHook = new DummyErrorHook();

			const RESULT: unknown = HookService["InstantiateHook"](HOOK, CONTEXT);

			strictEqual(RESULT, HOOK);
			strictEqual(HOOK["context"], undefined);
		});

		it("should instantiate an error hook class and set its context property", (): void => {
			const CONTEXT: ExecutionContext = mockContext().instance;

			class DummyErrorHook extends BasePreHook
			{
				public async execute(): Promise<void> { }
			}

			const EXPECTED: DummyErrorHook = new DummyErrorHook();

			// @ts-expect-error: Setting a readonly property for testing purposes
			EXPECTED["context"] = CONTEXT;

			const RESULT: unknown = HookService["InstantiateHook"](DummyErrorHook, CONTEXT);

			deepStrictEqual(RESULT, EXPECTED);
		});
	});

	describe("CompileHooks", (): void => {
		it("should return all the hooks to run, instantiated and filtered", (): void => {
			const CONTEXT: ExecutionContext = mockContext().instance;

			class DummyHook extends BasePreHook
			{
				public override execute(): void {}
			}

			class ExcludedHook extends BasePreHook
			{
				public override execute(): void {}
			}

			const GLOBAL_CONTEXTUAL_DUMMY_HOOK: DummyHook = new DummyHook();
			const GLOBAL_DUMMY_HOOK: DummyHook = new DummyHook();
			const GLOBAL_IGNORED_HOOK: ExcludedHook = new ExcludedHook();
			const CONTEXTUAL_DUMMY_HOOK: DummyHook = new DummyHook();
			const DUMMY_HOOK: DummyHook = new DummyHook();
			const IGNORED_HOOK: ExcludedHook = new ExcludedHook();

			const EXPECTED: Array<BasePreHook> = [
				GLOBAL_CONTEXTUAL_DUMMY_HOOK,
				GLOBAL_DUMMY_HOOK,
				CONTEXTUAL_DUMMY_HOOK,
				DUMMY_HOOK,
				IGNORED_HOOK,
			];

			INSTANTIATE_HOOK_STUB.onCall(0).returns(GLOBAL_CONTEXTUAL_DUMMY_HOOK);
			INSTANTIATE_HOOK_STUB.onCall(1).returns(GLOBAL_DUMMY_HOOK);
			INSTANTIATE_HOOK_STUB.onCall(2).returns(GLOBAL_IGNORED_HOOK);
			INSTANTIATE_HOOK_STUB.onCall(3).returns(CONTEXTUAL_DUMMY_HOOK);
			INSTANTIATE_HOOK_STUB.onCall(4).returns(DUMMY_HOOK);
			INSTANTIATE_HOOK_STUB.onCall(5).returns(IGNORED_HOOK);

			const PARAMETERS: HooksInterface<BasePreHook> = {
				context: CONTEXT,
				global: [DummyHook, DUMMY_HOOK, IGNORED_HOOK],
				excluded: [ExcludedHook],
				local: [DummyHook, DUMMY_HOOK, IGNORED_HOOK],
			};

			const RESULT: unknown = HookService["CompileHooks"](PARAMETERS);

			strictEqual(INSTANTIATE_HOOK_STUB.callCount, 6, "'HookService.InstantiateHook' should have been called exactly six times");
			deepStrictEqual(INSTANTIATE_HOOK_STUB.getCall(0).args, [DummyHook, CONTEXT], "'HookService.InstantiateHook' should have been called with the first global hook on the first call");
			deepStrictEqual(INSTANTIATE_HOOK_STUB.getCall(1).args, [DUMMY_HOOK, CONTEXT], "'HookService.InstantiateHook' should have been called with the second global hook on the second call");
			deepStrictEqual(INSTANTIATE_HOOK_STUB.getCall(2).args, [IGNORED_HOOK, CONTEXT], "'HookService.InstantiateHook' should have been called with the third global hook on the third call");
			deepStrictEqual(INSTANTIATE_HOOK_STUB.getCall(3).args, [DummyHook, CONTEXT], "'HookService.InstantiateHook' should have been called with the first local hook on the fourth call");
			deepStrictEqual(INSTANTIATE_HOOK_STUB.getCall(4).args, [DUMMY_HOOK, CONTEXT], "'HookService.InstantiateHook' should have been called with the second local hook on the fifth call");
			deepStrictEqual(INSTANTIATE_HOOK_STUB.getCall(5).args, [IGNORED_HOOK, CONTEXT], "'HookService.InstantiateHook' should have been called with the third local hook on the sixth call");

			deepStrictEqual(RESULT, EXPECTED);
		});
	});

	describe("RunPreHooks", (): void => {
		it("should call the 'CompileHooks' method with all the necessary parameters, then run the hooks", async (): Promise<void> => {
			const CONTEXT: ExecutionContext = mockContext().instance;

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
			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const HOOK_EXECUTE_STUB: SinonStub = stub(DummyHook.prototype, "execute");
			const GET_LOCAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getPreHooks");
			const GET_EXCLUDED_GLOBAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getExcludedGlobalPreHooks");

			const HOOKS_TO_RUN: Array<BasePreHook> = [new DummyHook(), new DummyHook(), new DummyHook()];

			GET_PRE_HOOKS_STUB.returns([DummyHook, ExcludedHook]);
			GET_LOCAL_HOOKS_STUB.returns([DUMMY_HOOK]);
			GET_EXCLUDED_GLOBAL_HOOKS_STUB.returns([ExcludedHook]);
			COMPILE_HOOKS_STUB.returns(HOOKS_TO_RUN);

			const EXPECTED_HOOKS: HooksInterface<BasePreHook> = {
				context: CONTEXT,
				global: [DummyHook, ExcludedHook],
				excluded: [ExcludedHook],
				local: [DUMMY_HOOK],
			};

			const RESULT: unknown = HookService.RunPreHooks(ENDPOINT, CONTEXT);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);

			strictEqual(GET_PRE_HOOKS_STUB.callCount, 1, "'HookRegistry.GetPreHooks' should have been called exactly once");
			strictEqual(GET_LOCAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getPreHooks' should have been called exactly once");
			strictEqual(GET_EXCLUDED_GLOBAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getExcludedGlobalPreHooks' should have been called exactly once");
			strictEqual(COMPILE_HOOKS_STUB.callCount, 1, "The 'CompileHooks' method should have been called exactly once");

			deepStrictEqual(COMPILE_HOOKS_STUB.firstCall.args, [EXPECTED_HOOKS]);

			strictEqual(HOOK_EXECUTE_STUB.callCount, 3);
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.thisValue, HOOKS_TO_RUN[0]);
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.args, [CONTEXT]);
			deepStrictEqual(HOOK_EXECUTE_STUB.secondCall.thisValue, HOOKS_TO_RUN[1]);
			deepStrictEqual(HOOK_EXECUTE_STUB.secondCall.args, [CONTEXT]);
			deepStrictEqual(HOOK_EXECUTE_STUB.thirdCall.thisValue, HOOKS_TO_RUN[2]);
			deepStrictEqual(HOOK_EXECUTE_STUB.thirdCall.args, [CONTEXT]);
		});
	});

	describe("RunPostHooks", (): void => {
		it("should call the 'CompileHooks' method with all the necessary parameters, then run the hooks", async (): Promise<void> => {
			const CONTEXT: ExecutionContext = mockContext().instance;

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
			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const HOOK_EXECUTE_STUB: SinonStub = stub(DummyHook.prototype, "execute");
			const GET_LOCAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getPostHooks");
			const GET_EXCLUDED_GLOBAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getExcludedGlobalPostHooks");

			const HOOKS_TO_RUN: Array<BasePostHook> = [new DummyHook(), new DummyHook(), new DummyHook()];

			GET_POST_HOOKS_STUB.returns([DummyHook, ExcludedHook]);
			GET_LOCAL_HOOKS_STUB.returns([DUMMY_HOOK]);
			GET_EXCLUDED_GLOBAL_HOOKS_STUB.returns([ExcludedHook]);
			COMPILE_HOOKS_STUB.returns(HOOKS_TO_RUN);

			const EXPECTED_HOOKS: HooksInterface<BasePostHook> = {
				context: CONTEXT,
				global: [DummyHook, ExcludedHook],
				excluded: [ExcludedHook],
				local: [DUMMY_HOOK],
			};

			const RESULT: unknown = HookService.RunPostHooks(ENDPOINT, CONTEXT);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);

			strictEqual(GET_POST_HOOKS_STUB.callCount, 1, "'HookRegistry.GetPostHooks' should have been called exactly once");
			strictEqual(GET_LOCAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getPostHooks' should have been called exactly once");
			strictEqual(GET_EXCLUDED_GLOBAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getExcludedGlobalPostHooks' should have been called exactly once");
			strictEqual(COMPILE_HOOKS_STUB.callCount, 1, "The 'CompileHooks' method should have been called exactly once");

			deepStrictEqual(COMPILE_HOOKS_STUB.firstCall.args, [EXPECTED_HOOKS]);

			strictEqual(HOOK_EXECUTE_STUB.callCount, 3);
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.thisValue, HOOKS_TO_RUN[0]);
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.args, [CONTEXT]);
			deepStrictEqual(HOOK_EXECUTE_STUB.secondCall.thisValue, HOOKS_TO_RUN[1]);
			deepStrictEqual(HOOK_EXECUTE_STUB.secondCall.args, [CONTEXT]);
			deepStrictEqual(HOOK_EXECUTE_STUB.thirdCall.thisValue, HOOKS_TO_RUN[2]);
			deepStrictEqual(HOOK_EXECUTE_STUB.thirdCall.args, [CONTEXT]);
		});
	});

	describe("RunErrorHooks", (): void => {
		it("should call the 'CompileHooks' method with all the necessary parameters, then run the hooks", async (): Promise<void> => {
			const CONTEXT: ExecutionContext = mockContext().instance;

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

			const ERROR: Error = new Error("Test");
			const DUMMY_HOOK: DummyHook = new DummyHook();
			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const HOOK_EXECUTE_STUB: SinonStub = stub(DummyHook.prototype, "execute");
			const GET_LOCAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getErrorHooks");
			const GET_EXCLUDED_GLOBAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getExcludedGlobalErrorHooks");

			const HOOKS_TO_RUN: Array<BaseErrorHook> = [new DummyHook(), new DummyHook(), new DummyHook()];

			GET_ERROR_HOOKS_STUB.returns([DummyHook, ExcludedHook]);
			GET_LOCAL_HOOKS_STUB.returns([DUMMY_HOOK]);
			GET_EXCLUDED_GLOBAL_HOOKS_STUB.returns([ExcludedHook]);
			COMPILE_HOOKS_STUB.returns(HOOKS_TO_RUN);
			SPECIAL_ERROR_HANDLING_STUB.returns(undefined);

			const EXPECTED_HOOKS: HooksInterface<BaseErrorHook> = {
				context: CONTEXT,
				global: [DummyHook, ExcludedHook],
				excluded: [ExcludedHook],
				local: [DUMMY_HOOK],
			};

			const RESULT: unknown = HookService.RunErrorHooks(ENDPOINT, CONTEXT, ERROR);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);

			strictEqual(GET_ERROR_HOOKS_STUB.callCount, 1, "'HookRegistry.GetErrorHooks' should have been called exactly once");
			strictEqual(GET_LOCAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getErrorHooks' should have been called exactly once");
			strictEqual(GET_EXCLUDED_GLOBAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getExcludedGlobalErrorHooks' should have been called exactly once");
			strictEqual(COMPILE_HOOKS_STUB.callCount, 1, "The 'CompileHooks' method should have been called exactly once");
			deepStrictEqual(COMPILE_HOOKS_STUB.firstCall.args, [EXPECTED_HOOKS]);
			strictEqual(SPECIAL_ERROR_HANDLING_STUB.callCount, 1, "The 'SpecialErrorHandling' method should have been called exactly once");
			deepStrictEqual(SPECIAL_ERROR_HANDLING_STUB.firstCall.args, [ERROR, HOOKS_TO_RUN]);

			strictEqual(HOOK_EXECUTE_STUB.callCount, 3);
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.thisValue, HOOKS_TO_RUN[0]);
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.args, [CONTEXT, ERROR]);
			deepStrictEqual(HOOK_EXECUTE_STUB.secondCall.thisValue, HOOKS_TO_RUN[1]);
			deepStrictEqual(HOOK_EXECUTE_STUB.secondCall.args, [CONTEXT, ERROR]);
			deepStrictEqual(HOOK_EXECUTE_STUB.thirdCall.thisValue, HOOKS_TO_RUN[2]);
			deepStrictEqual(HOOK_EXECUTE_STUB.thirdCall.args, [CONTEXT, ERROR]);
		});
	});

	describe("RunFallbackErrorHooks", (): void => {
		it("should call the 'CompileHooks' method with all the necessary parameters, then run the hooks", async (): Promise<void> => {
			const CONTEXT: ExecutionContext = mockContext().instance;

			class DummyHook extends BaseErrorHook
			{
				public override execute(): void {}
			}

			const ERROR: Error = new Error("Test");

			const HOOK_EXECUTE_STUB: SinonStub = stub(DummyHook.prototype, "execute");

			const HOOKS_TO_RUN: Array<BaseErrorHook> = [new DummyHook(), new DummyHook(), new DummyHook()];

			GET_ERROR_HOOKS_STUB.returns([DummyHook]);
			COMPILE_HOOKS_STUB.returns(HOOKS_TO_RUN);
			SPECIAL_ERROR_HANDLING_STUB.returns(undefined);

			const EXPECTED_HOOKS: HooksInterface<BaseErrorHook> = {
				context: CONTEXT,
				global: [DummyHook],
				excluded: [],
				local: [],
			};

			const RESULT: unknown = HookService.RunFallbackErrorHooks(CONTEXT, ERROR);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);

			strictEqual(GET_ERROR_HOOKS_STUB.callCount, 1, "'HookRegistry.GetErrorHooks' should have been called exactly once");
			strictEqual(COMPILE_HOOKS_STUB.callCount, 1, "The 'CompileHooks' method should have been called exactly once");
			deepStrictEqual(COMPILE_HOOKS_STUB.firstCall.args, [EXPECTED_HOOKS]);
			strictEqual(SPECIAL_ERROR_HANDLING_STUB.callCount, 1, "The 'SpecialErrorHandling' method should have been called exactly once");
			deepStrictEqual(SPECIAL_ERROR_HANDLING_STUB.firstCall.args, [ERROR, HOOKS_TO_RUN]);

			strictEqual(HOOK_EXECUTE_STUB.callCount, 3);
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.thisValue, HOOKS_TO_RUN[0]);
			deepStrictEqual(HOOK_EXECUTE_STUB.firstCall.args, [CONTEXT, ERROR]);
			deepStrictEqual(HOOK_EXECUTE_STUB.secondCall.thisValue, HOOKS_TO_RUN[1]);
			deepStrictEqual(HOOK_EXECUTE_STUB.secondCall.args, [CONTEXT, ERROR]);
			deepStrictEqual(HOOK_EXECUTE_STUB.thirdCall.thisValue, HOOKS_TO_RUN[2]);
			deepStrictEqual(HOOK_EXECUTE_STUB.thirdCall.args, [CONTEXT, ERROR]);
		});
	});

	describe("SpecialErrorHandling", (): void => {
		it("should call 'LoggerProxy.Error' and pass it the error", (): void => {
			const ERROR: Error = new Error("Test");

			const HOOKS_TO_RUN: Array<BaseErrorHook> = [];

			HookService["SpecialErrorHandling"](ERROR, HOOKS_TO_RUN);

			strictEqual(LOGGER_PROXY_ERROR_STUB.callCount, 1, "'LoggerProxy.Error' should have been called exactly once");
			deepStrictEqual(LOGGER_PROXY_ERROR_STUB.firstCall.args, [ERROR]);
		});

		it("should do nothing if there is at least 1 hook", (): void => {
			const ERROR: Error = new Error("Test");

			class DummyHook extends BaseErrorHook
			{
				public override execute(): void {}
			}

			const HOOKS_TO_RUN: Array<BaseErrorHook> = [new DummyHook()];

			HookService["SpecialErrorHandling"](ERROR, HOOKS_TO_RUN);

			strictEqual(LOGGER_PROXY_ERROR_STUB.callCount, 0, "'LoggerProxy.Error' should not have been called");
		});

		it("should do nothing if the error is an instance of HTTPError", (): void => {
			const ERROR: Error = new HTTPError({
				message: "Test",
				statusCode: HTTPStatusCodeEnum.SERVICE_UNAVAILABLE,
			});

			const HOOKS_TO_RUN: Array<BaseErrorHook> = [];

			HookService["SpecialErrorHandling"](ERROR, HOOKS_TO_RUN);

			strictEqual(LOGGER_PROXY_ERROR_STUB.callCount, 0, "'LoggerProxy.Error' should not have been called");
		});
	});
});
