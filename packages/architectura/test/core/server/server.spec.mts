import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, ok, strictEqual } from "node:assert";
import { Server as UnsafeServer } from "node:http";
import { Server as SecureServer } from "node:https";
import { type SinonStub, stub } from "sinon";
import { ReflectUtility, instanceOf } from "@vitruvius-labs/toolbox";
import { AssetRegistry, BaseEndpoint, BaseErrorHook, BasePostHook, BasePreHook, type EndpointMatchInterface, EndpointRegistry, ExecutionContext, ExecutionContextRegistry, FileSystemService, HTTPMethodEnum, HTTPStatusCodeEnum, HookRegistry, LoggerProxy, type SecureServerInstantiationInterface, Server, type UnsafeServerInstantiationInterface } from "../../../src/_index.mjs";
import { mockContext } from "../../../mock/mock-context.mjs";
import type { MockContextInterface } from "../../../mock/_index.mjs";

describe("Server", (): void => {
	// @ts-expect-error: Stubbing a private method
	const HANDLE_PUBLIC_ASSETS_STUB: SinonStub = stub(Server, "HandlePublicAssets");
	// @ts-expect-error: Stubbing a private method
	const HANDLE_ENDPOINTS_STUB: SinonStub = stub(Server, "HandleEndpoints");
	// @ts-expect-error: Stubbing a private method
	const RUN_PRE_HOOKS_STUB: SinonStub = stub(Server, "RunPreHooks");
	// @ts-expect-error: Stubbing a private method
	const RUN_POST_HOOKS_STUB: SinonStub = stub(Server, "RunPostHooks");
	// @ts-expect-error: Stubbing a private method
	const RUN_ERROR_HOOKS_STUB: SinonStub = stub(Server, "RunErrorHooks");
	// @ts-expect-error: Stubbing a private method
	const FINALIZE_RESPONSE_STUB: SinonStub = stub(Server, "FinalizeResponse");
	const LOGGER_DEBUG_STUB: SinonStub = stub(LoggerProxy, "Debug");
	const LOGGER_INFORMATIONAL_STUB: SinonStub = stub(LoggerProxy, "Informational");
	const LOGGER_INFO_STUB: SinonStub = stub(LoggerProxy, "Info");
	const LOGGER_NOTICE_STUB: SinonStub = stub(LoggerProxy, "Notice");
	const LOGGER_WARNING_STUB: SinonStub = stub(LoggerProxy, "Warning");
	const LOGGER_ERROR_STUB: SinonStub = stub(LoggerProxy, "Error");
	const LOGGER_CRITICAL_STUB: SinonStub = stub(LoggerProxy, "Critical");
	const LOGGER_ALERT_STUB: SinonStub = stub(LoggerProxy, "Alert");
	const LOGGER_EMERGENCY_STUB: SinonStub = stub(LoggerProxy, "Emergency");
	const UNSAFE_LISTENER_STUB: SinonStub = stub(UnsafeServer.prototype, "addListener");
	const UNSAFE_LISTEN_STUB: SinonStub = stub(UnsafeServer.prototype, "listen");
	const SECURE_LISTENER_STUB: SinonStub = stub(SecureServer.prototype, "addListener");
	const SECURE_LISTEN_STUB: SinonStub = stub(SecureServer.prototype, "listen");
	const CREATE_CONTEXT_STUB: SinonStub = stub(ExecutionContext, "Create");
	const GET_CONTEXT_STUB: SinonStub = stub(ExecutionContextRegistry, "GetUnsafeExecutionContext");
	const SET_CONTEXT_STUB: SinonStub = stub(ExecutionContextRegistry, "SetExecutionContext");
	const GET_PRE_HOOKS_STUB: SinonStub = stub(HookRegistry, "GetPreHooks");
	const GET_POST_HOOKS_STUB: SinonStub = stub(HookRegistry, "GetPostHooks");
	const GET_ERROR_HOOKS_STUB: SinonStub = stub(HookRegistry, "GetErrorHooks");
	const FIND_ENDPOINT_STUB: SinonStub = stub(EndpointRegistry, "FindEndpoint");
	const FIND_PUBLIC_ASSET_STUB: SinonStub = stub(AssetRegistry, "FindPublicAsset");
	const READ_FILE_STUB: SinonStub = stub(FileSystemService, "ReadBinaryFile");

	beforeEach((): void => {
		HANDLE_PUBLIC_ASSETS_STUB.reset();
		HANDLE_PUBLIC_ASSETS_STUB.resolves();
		HANDLE_ENDPOINTS_STUB.reset();
		HANDLE_ENDPOINTS_STUB.resolves();
		RUN_PRE_HOOKS_STUB.reset();
		RUN_PRE_HOOKS_STUB.resolves();
		RUN_POST_HOOKS_STUB.reset();
		RUN_POST_HOOKS_STUB.resolves();
		RUN_ERROR_HOOKS_STUB.reset();
		RUN_ERROR_HOOKS_STUB.resolves();
		FINALIZE_RESPONSE_STUB.reset();
		FINALIZE_RESPONSE_STUB.resolves();
		LOGGER_DEBUG_STUB.reset();
		LOGGER_DEBUG_STUB.returns(undefined);
		LOGGER_INFORMATIONAL_STUB.reset();
		LOGGER_INFORMATIONAL_STUB.returns(undefined);
		LOGGER_INFO_STUB.reset();
		LOGGER_INFO_STUB.returns(undefined);
		LOGGER_NOTICE_STUB.reset();
		LOGGER_NOTICE_STUB.returns(undefined);
		LOGGER_WARNING_STUB.reset();
		LOGGER_WARNING_STUB.returns(undefined);
		LOGGER_ERROR_STUB.reset();
		LOGGER_ERROR_STUB.returns(undefined);
		LOGGER_CRITICAL_STUB.reset();
		LOGGER_CRITICAL_STUB.returns(undefined);
		LOGGER_ALERT_STUB.reset();
		LOGGER_ALERT_STUB.returns(undefined);
		LOGGER_EMERGENCY_STUB.reset();
		LOGGER_EMERGENCY_STUB.returns(undefined);
		UNSAFE_LISTENER_STUB.reset();
		UNSAFE_LISTENER_STUB.returns(undefined);
		UNSAFE_LISTEN_STUB.reset();
		UNSAFE_LISTEN_STUB.returnsThis();
		SECURE_LISTENER_STUB.reset();
		SECURE_LISTENER_STUB.returns(undefined);
		SECURE_LISTEN_STUB.reset();
		SECURE_LISTEN_STUB.returnsThis();
		CREATE_CONTEXT_STUB.reset();
		CREATE_CONTEXT_STUB.callThrough();
		GET_CONTEXT_STUB.reset();
		GET_CONTEXT_STUB.returns(undefined);
		SET_CONTEXT_STUB.reset();
		SET_CONTEXT_STUB.returns(undefined);
		GET_PRE_HOOKS_STUB.reset();
		GET_PRE_HOOKS_STUB.returns([]);
		GET_POST_HOOKS_STUB.reset();
		GET_POST_HOOKS_STUB.returns([]);
		GET_ERROR_HOOKS_STUB.reset();
		GET_ERROR_HOOKS_STUB.returns([]);
		FIND_ENDPOINT_STUB.reset();
		FIND_ENDPOINT_STUB.returns(undefined);
		FIND_PUBLIC_ASSET_STUB.reset();
		FIND_PUBLIC_ASSET_STUB.returns(undefined);
		READ_FILE_STUB.reset();
		READ_FILE_STUB.resolves();
	});

	after((): void => {
		HANDLE_PUBLIC_ASSETS_STUB.restore();
		HANDLE_ENDPOINTS_STUB.restore();
		RUN_PRE_HOOKS_STUB.restore();
		RUN_POST_HOOKS_STUB.restore();
		RUN_ERROR_HOOKS_STUB.restore();
		FINALIZE_RESPONSE_STUB.restore();
		LOGGER_DEBUG_STUB.restore();
		LOGGER_INFORMATIONAL_STUB.restore();
		LOGGER_INFO_STUB.restore();
		LOGGER_NOTICE_STUB.restore();
		LOGGER_WARNING_STUB.restore();
		LOGGER_ERROR_STUB.restore();
		LOGGER_CRITICAL_STUB.restore();
		LOGGER_ALERT_STUB.restore();
		LOGGER_EMERGENCY_STUB.restore();
		UNSAFE_LISTENER_STUB.restore();
		UNSAFE_LISTEN_STUB.restore();
		SECURE_LISTENER_STUB.restore();
		SECURE_LISTEN_STUB.restore();
		CREATE_CONTEXT_STUB.restore();
		GET_CONTEXT_STUB.restore();
		SET_CONTEXT_STUB.restore();
		GET_PRE_HOOKS_STUB.restore();
		GET_POST_HOOKS_STUB.restore();
		GET_ERROR_HOOKS_STUB.restore();
		FIND_ENDPOINT_STUB.restore();
		FIND_PUBLIC_ASSET_STUB.restore();
		READ_FILE_STUB.restore();
	});

	describe("constructor", (): void => {
		it("should create a new server instance (unsafe)", (): void => {
			const CONFIG: UnsafeServerInstantiationInterface = {
				https: false,
				port: 80,
			};

			// @ts-expect-error: For testing purposes
			const SERVER: Server = new Server(CONFIG);

			strictEqual(ReflectUtility.Get(SERVER, "https"), false);
			strictEqual(ReflectUtility.Get(SERVER, "port"), 80);
		});

		it.skip("should create a new server instance (secure)", (): void => {
			const CONFIG: SecureServerInstantiationInterface = {
				https: true,
				port: 80,
				key: "",
				certificate: "",
			};

			// @ts-expect-error: For testing purposes
			const SERVER: Server = new Server(CONFIG);

			strictEqual(ReflectUtility.Get(SERVER, "https"), false);
			strictEqual(ReflectUtility.Get(SERVER, "port"), 80);
		});
	});

	describe("Create", (): void => {
		it("should create a new server instance (unsafe)", async (): Promise<void> => {
			const CONFIG: UnsafeServerInstantiationInterface = {
				https: false,
				port: 80,
			};

			const SERVER: Server = await Server.Create({
				https: false,
				port: 80,
			});

			// @ts-expect-error: For testing purposes
			const EXPECTED: Server = new Server(CONFIG);

			deepStrictEqual(SERVER, EXPECTED);
			strictEqual(UNSAFE_LISTENER_STUB.callCount, 1, "The 'addListener' method of the native server should be called");
			strictEqual(UNSAFE_LISTENER_STUB.firstCall.firstArg, "request");
		});

		it.skip("should create a new server instance (secure)", async (): Promise<void> => {
			const CONFIG: SecureServerInstantiationInterface = {
				https: true,
				port: 80,
				key: "",
				certificate: "",
			};

			const SERVER: Server = await Server.Create({
				https: true,
				port: 80,
				key: "",
				certificate: "",
			});

			// @ts-expect-error: For testing purposes
			const EXPECTED: Server = new Server(CONFIG);

			deepStrictEqual(SERVER, EXPECTED);
			strictEqual(SECURE_LISTENER_STUB.callCount, 1, "The 'addListener' method of the native server should be called");
			strictEqual(SECURE_LISTENER_STUB.firstCall.firstArg, "request");
		});
	});

	describe("HandleError", (): void => {
		it("should log an error when without context", async (): Promise<void> => {
			const ERROR: Error = new Error("Test Error");

			await Server.HandleError(ERROR);

			strictEqual(LOGGER_ERROR_STUB.callCount, 1, "'LoggerProxy.Error' should have been called");
			deepStrictEqual(LOGGER_ERROR_STUB.firstCall.args, [ERROR]);
		});

		it("should process an error in the error hooks when there is a context", async (): Promise<void> => {
			class DummyHook extends BaseErrorHook
			{
				// @ts-expect-error: For testing purposes
				// eslint-disable-next-line @ts/no-unused-vars -- For testing purposes
				public override execute(context: ExecutionContext, error: unknown): void
				{
				}
			}

			const HOOK: DummyHook = new DummyHook();
			const HOOK_STUB: SinonStub = stub(HOOK, "execute");
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			GET_CONTEXT_STUB.returns(CONTEXT_MOCK.instance);
			GET_ERROR_HOOKS_STUB.returns([HOOK]);
			HOOK_STUB.rejects();
			FINALIZE_RESPONSE_STUB.rejects();

			const ERROR: Error = new Error("Test Error");

			await Server.HandleError(ERROR);

			strictEqual(GET_ERROR_HOOKS_STUB.callCount, 1, "'HookRegistry.GetErrorHooks' should have been called");
			strictEqual(HOOK_STUB.callCount, 1, "All hooks method 'execute' should have been called");
			deepStrictEqual(HOOK_STUB.firstCall.args, [CONTEXT_MOCK.instance, ERROR]);
			strictEqual(FINALIZE_RESPONSE_STUB.callCount, 1, "'Server.FinalizeResponse' should have been called");
			deepStrictEqual(FINALIZE_RESPONSE_STUB.firstCall.args, [CONTEXT_MOCK.instance, true]);
			strictEqual(LOGGER_ERROR_STUB.callCount, 1, "'LoggerProxy.Error' should have been called");
		});

		it("should be safe (without context)", async (): Promise<void> => {
			LOGGER_ERROR_STUB.throws();

			await doesNotReject(Server.HandleError(new Error("Test Error")));
			strictEqual(LOGGER_ERROR_STUB.callCount, 1, "'LoggerProxy.Error' method should have been called");
		});

		it("should be safe (with context)", async (): Promise<void> => {
			class DummyHook extends BaseErrorHook
			{
				// @ts-expect-error: For testing purposes
				// eslint-disable-next-line @ts/no-unused-vars -- For testing purposes
				public override execute(context: ExecutionContext, error: unknown): void
				{
				}
			}

			const HOOK: DummyHook = new DummyHook();
			const HOOK_STUB: SinonStub = stub(HOOK, "execute");
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			GET_CONTEXT_STUB.returns(CONTEXT_MOCK.instance);
			GET_ERROR_HOOKS_STUB.returns([HOOK]);

			HOOK_STUB.rejects();
			FINALIZE_RESPONSE_STUB.rejects();

			await doesNotReject(Server.HandleError(new Error("Test Error")));
			strictEqual(FINALIZE_RESPONSE_STUB.callCount, 1, "'Server.FinalizeResponse' method should have been called");
			strictEqual(LOGGER_ERROR_STUB.callCount, 1, "'LoggerProxy.Error' method should have been called");
		});
	});

	describe("RequestListener", (): void => {
		it("should initialize the request", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			const RESULT: unknown = ReflectUtility.Call(Server, "RequestListener", CONTEXT_MOCK.request.instance, CONTEXT_MOCK.response.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(CONTEXT_MOCK.request.stubs.initialize.callCount, 1, "The 'initialize' method of the request should have been called exactly once");
		});

		it("should create the context", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			CREATE_CONTEXT_STUB.returns(CONTEXT_MOCK.instance);

			const RESULT: unknown = ReflectUtility.Call(Server, "RequestListener", CONTEXT_MOCK.request.instance, CONTEXT_MOCK.response.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(CREATE_CONTEXT_STUB.callCount, 1, "'ExecutionContext.Create' should have been called exactly once");
			deepStrictEqual(CREATE_CONTEXT_STUB.firstCall.args, [{ request: CONTEXT_MOCK.request.instance, response: CONTEXT_MOCK.response.instance }]);
			strictEqual(SET_CONTEXT_STUB.callCount, 1, "'ExecutionContextRegistry.SetExecutionContext' should have been called exactly once");
			deepStrictEqual(SET_CONTEXT_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
		});

		it("should test for public assets", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			CREATE_CONTEXT_STUB.returns(CONTEXT_MOCK.instance);

			const RESULT: unknown = ReflectUtility.Call(Server, "RequestListener", CONTEXT_MOCK.request.instance, CONTEXT_MOCK.response.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(HANDLE_PUBLIC_ASSETS_STUB.callCount, 1, "'Server.HandlePublicAssets' should have been called exactly once");
			deepStrictEqual(HANDLE_PUBLIC_ASSETS_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
		});

		it("should test for endpoints", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			CREATE_CONTEXT_STUB.returns(CONTEXT_MOCK.instance);

			const RESULT: unknown = ReflectUtility.Call(Server, "RequestListener", CONTEXT_MOCK.request.instance, CONTEXT_MOCK.response.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(HANDLE_ENDPOINTS_STUB.callCount, 1, "'Server.HandleEndpoints' should have been called exactly once");
			deepStrictEqual(HANDLE_ENDPOINTS_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
		});

		it("should respond if nothing match", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			CREATE_CONTEXT_STUB.returns(CONTEXT_MOCK.instance);

			const RESULT: unknown = ReflectUtility.Call(Server, "RequestListener", CONTEXT_MOCK.request.instance, CONTEXT_MOCK.response.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(CONTEXT_MOCK.response.stubs.replyWith.callCount, 1, "The response method 'replyWith' should have been called exactly once");

			deepStrictEqual(CONTEXT_MOCK.response.stubs.replyWith.firstCall.args, [{
				status: HTTPStatusCodeEnum.NOT_FOUND,
				payload: "404 - Not found.",
			}]);
		});
	});

	describe("HandlePublicAssets", (): void => {
		it("should return false if the request method is anything but 'GET'", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_PUBLIC_ASSETS_STUB.callThrough();

			const METHODS: Array<HTTPMethodEnum> = [
				HTTPMethodEnum.OPTIONS,
				HTTPMethodEnum.HEAD,
				HTTPMethodEnum.PUT,
				HTTPMethodEnum.POST,
				HTTPMethodEnum.PATCH,
				HTTPMethodEnum.DELETE,
			];

			for (const METHOD of METHODS)
			{
				CONTEXT_MOCK.request.stubs.getMethod.reset();
				CONTEXT_MOCK.request.stubs.getMethod.returns(METHOD);

				const RESULT: unknown = ReflectUtility.Call(Server, "HandlePublicAssets", CONTEXT_MOCK.instance);

				instanceOf(RESULT, Promise);
				await doesNotReject(RESULT);
				strictEqual(await RESULT, false);
				strictEqual(CONTEXT_MOCK.request.stubs.getMethod.callCount, 1, "Request 'getMethod' should have been called exactly once");
			}
		});

		it("should return false if no matching asset is found in the registry", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_PUBLIC_ASSETS_STUB.callThrough();
			CONTEXT_MOCK.request.stubs.getPath.returns("/alpha-omega/lorem-ipsum.png");
			FIND_PUBLIC_ASSET_STUB.resolves(undefined);

			const RESULT: unknown = ReflectUtility.Call(Server, "HandlePublicAssets", CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, false);
			strictEqual(FIND_PUBLIC_ASSET_STUB.callCount, 1, "'AssetRegistry.FindPublicAsset' should have been called exactly once");
			deepStrictEqual(FIND_PUBLIC_ASSET_STUB.firstCall.args, ["/alpha-omega/lorem-ipsum.png"]);
		});

		it("should read the content of the file and pass it to the response, then return true", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_PUBLIC_ASSETS_STUB.callThrough();
			CONTEXT_MOCK.request.stubs.getPath.returns("/alpha-omega/lorem-ipsum.png");
			FIND_PUBLIC_ASSET_STUB.resolves("~/alpha-omega/lorem-ipsum.png");
			READ_FILE_STUB.resolves(Buffer.from("Hello, World!"));
			CONTEXT_MOCK.response.stubs.replyWith.resolves();

			const RESULT: unknown = ReflectUtility.Call(Server, "HandlePublicAssets", CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, true);
			strictEqual(READ_FILE_STUB.callCount, 1, "'FileSystemService.ReadBinaryFile' should have been called exactly once");
			deepStrictEqual(READ_FILE_STUB.firstCall.args, ["~/alpha-omega/lorem-ipsum.png"]);
			strictEqual(CONTEXT_MOCK.response.stubs.replyWith.callCount, 1, "The response method 'replyWith' should have been called exactly once");
			deepStrictEqual(CONTEXT_MOCK.response.stubs.replyWith.firstCall.args, [{ contentType: "image/png", payload: Buffer.from("Hello, World!") }]);
		});
	});

	describe("HandleEndpoints", (): void => {
		it("should return false if no matching endpoint is found in the registry", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_ENDPOINTS_STUB.callThrough();
			CONTEXT_MOCK.request.stubs.getPath.returns("/alpha-omega/lorem-ipsum");
			FIND_ENDPOINT_STUB.returns(undefined);

			const RESULT: unknown = ReflectUtility.Call(Server, "HandleEndpoints", CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, false);
			strictEqual(FIND_ENDPOINT_STUB.callCount, 1, "'EndpointRegistry.FindEndpoint' should have been called exactly once");
			deepStrictEqual(FIND_ENDPOINT_STUB.firstCall.args, ["GET", "/alpha-omega/lorem-ipsum"]);
		});

		it("should initialize the request's pathMatchGroups", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_ENDPOINTS_STUB.callThrough();
			CONTEXT_MOCK.request.stubs.getPath.returns("/alpha-omega/lorem-ipsum");

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const MATCH: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				contextual: false,
				matchGroups: {
					slug: "lorem-ipsum",
				},
			};

			FIND_ENDPOINT_STUB.returns(MATCH);

			const RESULT: unknown = ReflectUtility.Call(Server, "HandleEndpoints", CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, true);
			deepStrictEqual(ReflectUtility.Get(CONTEXT_MOCK.request.instance, "pathMatchGroups"), { slug: "lorem-ipsum" });
		});

		it("should initialize the endpoint's context if it's contextual", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_ENDPOINTS_STUB.callThrough();
			CONTEXT_MOCK.request.stubs.getPath.returns("/alpha-omega/lorem-ipsum");

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const MATCH: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				contextual: true,
				matchGroups: {},
			};

			FIND_ENDPOINT_STUB.returns(MATCH);

			const RESULT: unknown = ReflectUtility.Call(Server, "HandleEndpoints", CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, true);
			deepStrictEqual(ReflectUtility.Get(ENDPOINT, "context"), CONTEXT_MOCK.instance);
		});

		it("should not initialize the endpoint's context if it's not contextual", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_ENDPOINTS_STUB.callThrough();
			CONTEXT_MOCK.request.stubs.getPath.returns("/alpha-omega/lorem-ipsum");

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const MATCH: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				contextual: false,
				matchGroups: {},
			};

			FIND_ENDPOINT_STUB.returns(MATCH);

			const RESULT: unknown = ReflectUtility.Call(Server, "HandleEndpoints", CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, true);
			deepStrictEqual(ReflectUtility.Get(ENDPOINT, "context"), undefined);
		});

		it("should execute endpoint and hooks, then finalize the response", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_ENDPOINTS_STUB.callThrough();
			CONTEXT_MOCK.request.stubs.getPath.returns("/alpha-omega/lorem-ipsum");

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const ENDPOINT_EXECUTE_STUB: SinonStub = stub(ENDPOINT, "execute");

			const MATCH: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				contextual: false,
				matchGroups: {},
			};

			FIND_ENDPOINT_STUB.returns(MATCH);

			const RESULT: unknown = ReflectUtility.Call(Server, "HandleEndpoints", CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, true);
			strictEqual(RUN_PRE_HOOKS_STUB.callCount, 1, "The Server method 'RunPreHooks' should have been called exactly once");
			deepStrictEqual(RUN_PRE_HOOKS_STUB.firstCall.args, [ENDPOINT, CONTEXT_MOCK.instance]);
			strictEqual(ENDPOINT_EXECUTE_STUB.callCount, 1, "The endpoint's 'execute' method should have been called exactly once");
			deepStrictEqual(ENDPOINT_EXECUTE_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
			strictEqual(RUN_POST_HOOKS_STUB.callCount, 1, "The Server method 'RunPostHooks' should have been called exactly once");
			deepStrictEqual(RUN_POST_HOOKS_STUB.firstCall.args, [ENDPOINT, CONTEXT_MOCK.instance]);
			strictEqual(FINALIZE_RESPONSE_STUB.callCount, 1, "The Server method 'FinalizeResponse' should have been called exactly once");
			deepStrictEqual(FINALIZE_RESPONSE_STUB.firstCall.args, [CONTEXT_MOCK.instance, false]);
			ok(RUN_PRE_HOOKS_STUB.firstCall.calledBefore(ENDPOINT_EXECUTE_STUB.firstCall), "The pre-hooks should be run before executing the endpoint");
			ok(ENDPOINT_EXECUTE_STUB.firstCall.calledBefore(RUN_POST_HOOKS_STUB.firstCall), "The pre-hooks should be run after executing the endpoint");
			ok(RUN_POST_HOOKS_STUB.firstCall.calledBefore(FINALIZE_RESPONSE_STUB.firstCall), "The post-hooks should be run before finalizing the response");
		});

		it("should safely handle pre-hooks rejecting unexpectedly", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_ENDPOINTS_STUB.callThrough();
			CONTEXT_MOCK.request.stubs.getPath.returns("/alpha-omega/lorem-ipsum");

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const MATCH: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				contextual: false,
				matchGroups: {},
			};

			const ERROR: Error = new Error("Test Error");

			FIND_ENDPOINT_STUB.returns(MATCH);
			RUN_PRE_HOOKS_STUB.rejects(ERROR);

			const RESULT: unknown = ReflectUtility.Call(Server, "HandleEndpoints", CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, true);
			strictEqual(RUN_PRE_HOOKS_STUB.callCount, 1, "The Server method 'RunPreHooks' should have been called exactly once");
			deepStrictEqual(RUN_PRE_HOOKS_STUB.firstCall.args, [ENDPOINT, CONTEXT_MOCK.instance]);
			strictEqual(RUN_ERROR_HOOKS_STUB.callCount, 1, "The Server method 'RunErrorHooks' should have been called exactly once");
			deepStrictEqual(RUN_ERROR_HOOKS_STUB.firstCall.args, [ENDPOINT, CONTEXT_MOCK.instance, ERROR]);
			strictEqual(FINALIZE_RESPONSE_STUB.callCount, 1, "The Server method 'FinalizeResponse' should have been called exactly once");
			deepStrictEqual(FINALIZE_RESPONSE_STUB.firstCall.args, [CONTEXT_MOCK.instance, true]);
			ok(RUN_PRE_HOOKS_STUB.firstCall.calledBefore(RUN_ERROR_HOOKS_STUB.firstCall), "The pre-hooks should have been run before the error hooks");
			ok(RUN_ERROR_HOOKS_STUB.firstCall.calledBefore(FINALIZE_RESPONSE_STUB.firstCall), "The error-hooks should have been run before finalizing the response");
		});

		it("should safely handle endpoint rejecting unexpectedly", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_ENDPOINTS_STUB.callThrough();
			CONTEXT_MOCK.request.stubs.getPath.returns("/alpha-omega/lorem-ipsum");

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const ENDPOINT_EXECUTE_STUB: SinonStub = stub(ENDPOINT, "execute");

			const MATCH: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				contextual: false,
				matchGroups: {},
			};

			const ERROR: Error = new Error("Test Error");

			FIND_ENDPOINT_STUB.returns(MATCH);
			ENDPOINT_EXECUTE_STUB.rejects(ERROR);

			const RESULT: unknown = ReflectUtility.Call(Server, "HandleEndpoints", CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, true);
			strictEqual(ENDPOINT_EXECUTE_STUB.callCount, 1, "The endpoint method 'execute' should have been called exactly once");
			deepStrictEqual(ENDPOINT_EXECUTE_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
			strictEqual(RUN_ERROR_HOOKS_STUB.callCount, 1, "The Server method 'RunErrorHooks' should have been called exactly once");
			deepStrictEqual(RUN_ERROR_HOOKS_STUB.firstCall.args, [ENDPOINT, CONTEXT_MOCK.instance, ERROR]);
			strictEqual(FINALIZE_RESPONSE_STUB.callCount, 1, "The Server method 'FinalizeResponse' should have been called exactly once");
			deepStrictEqual(FINALIZE_RESPONSE_STUB.firstCall.args, [CONTEXT_MOCK.instance, true]);
			ok(ENDPOINT_EXECUTE_STUB.firstCall.calledBefore(RUN_ERROR_HOOKS_STUB.firstCall), "The endpoint should have been executed before the error hooks");
			ok(RUN_ERROR_HOOKS_STUB.firstCall.calledBefore(FINALIZE_RESPONSE_STUB.firstCall), "The error-hooks should have been run before finalizing the response");
		});

		it("should safely handle post-hooks rejecting unexpectedly", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_ENDPOINTS_STUB.callThrough();
			CONTEXT_MOCK.request.stubs.getPath.returns("/alpha-omega/lorem-ipsum");

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();

			const MATCH: EndpointMatchInterface = {
				endpoint: ENDPOINT,
				contextual: false,
				matchGroups: {},
			};

			const ERROR: Error = new Error("Test Error");

			FIND_ENDPOINT_STUB.returns(MATCH);
			RUN_POST_HOOKS_STUB.rejects(ERROR);

			const RESULT: unknown = ReflectUtility.Call(Server, "HandleEndpoints", CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, true);
			strictEqual(RUN_POST_HOOKS_STUB.callCount, 1, "The Server method 'RunPostHooks' should have been called exactly once");
			deepStrictEqual(RUN_POST_HOOKS_STUB.firstCall.args, [ENDPOINT, CONTEXT_MOCK.instance]);
			strictEqual(RUN_ERROR_HOOKS_STUB.callCount, 1, "The Server method 'RunErrorHooks' should have been called exactly once");
			deepStrictEqual(RUN_ERROR_HOOKS_STUB.firstCall.args, [ENDPOINT, CONTEXT_MOCK.instance, ERROR]);
			strictEqual(FINALIZE_RESPONSE_STUB.callCount, 1, "The Server method 'FinalizeResponse' should have been called exactly once");
			deepStrictEqual(FINALIZE_RESPONSE_STUB.firstCall.args, [CONTEXT_MOCK.instance, true]);
			ok(RUN_POST_HOOKS_STUB.firstCall.calledBefore(RUN_ERROR_HOOKS_STUB.firstCall), "The post-hooks should have been run before the error hooks");
			ok(RUN_ERROR_HOOKS_STUB.firstCall.calledBefore(FINALIZE_RESPONSE_STUB.firstCall), "The error-hooks should have been run before finalizing the response");
		});
	});

	describe("RunPreHooks", (): void => {
		it("should run all global, unless excluded, and local pre-hooks", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			class GlobalHook extends BasePreHook
			{
				public override execute(): void {}
			}

			class IgnoredHook extends BasePreHook
			{
				public override execute(): void {}
			}

			class LocalHook extends BasePreHook
			{
				public override execute(): void {}
			}

			const GLOBAL_HOOK: GlobalHook = new GlobalHook();
			const IGNORED_HOOK: IgnoredHook = new IgnoredHook();
			const LOCAL_HOOK: LocalHook = new LocalHook();
			const GLOBAL_HOOK_STUB: SinonStub = stub(GLOBAL_HOOK, "execute");
			const IGNORED_HOOK_STUB: SinonStub = stub(IGNORED_HOOK, "execute");
			const LOCAL_HOOK_STUB: SinonStub = stub(LOCAL_HOOK, "execute");

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();
			const GET_LOCAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getPreHooks");
			const GET_EXCLUDED_GLOBAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getExcludedGlobalPreHooks");

			GET_PRE_HOOKS_STUB.returns([GLOBAL_HOOK, IGNORED_HOOK]);
			GET_LOCAL_HOOKS_STUB.returns([LOCAL_HOOK]);
			GET_EXCLUDED_GLOBAL_HOOKS_STUB.returns([IgnoredHook]);
			RUN_PRE_HOOKS_STUB.callThrough();

			const RESULT: unknown = ReflectUtility.Call(Server, "RunPreHooks", ENDPOINT, CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(GET_PRE_HOOKS_STUB.callCount, 1, "'HookRegistry.GetPreHooks' should have been called exactly once");
			strictEqual(GET_LOCAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getPreHooks' should have been called exactly once");
			strictEqual(GET_EXCLUDED_GLOBAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getExcludedGlobalPreHooks' should have been called exactly once");
			strictEqual(GLOBAL_HOOK_STUB.callCount, 1, "Global pre-hook method 'execute' should have been called exactly once");
			deepStrictEqual(GLOBAL_HOOK_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
			strictEqual(IGNORED_HOOK_STUB.callCount, 0, "Excluded global pre-hook method 'execute' should not have been called");
			strictEqual(LOCAL_HOOK_STUB.callCount, 1, "Local pre-hook method 'execute' should have been called exactly once");
			deepStrictEqual(LOCAL_HOOK_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
		});
	});

	describe("RunPostHooks", (): void => {
		it("should run all global, unless excluded, and local post-hooks", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			class GlobalHook extends BasePostHook
			{
				public override execute(): void {}
			}

			class IgnoredHook extends BasePostHook
			{
				public override execute(): void {}
			}

			class LocalHook extends BasePostHook
			{
				public override execute(): void {}
			}

			const GLOBAL_HOOK: GlobalHook = new GlobalHook();
			const IGNORED_HOOK: IgnoredHook = new IgnoredHook();
			const LOCAL_HOOK: LocalHook = new LocalHook();
			const GLOBAL_HOOK_STUB: SinonStub = stub(GLOBAL_HOOK, "execute");
			const IGNORED_HOOK_STUB: SinonStub = stub(IGNORED_HOOK, "execute");
			const LOCAL_HOOK_STUB: SinonStub = stub(LOCAL_HOOK, "execute");

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();
			const GET_LOCAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getPostHooks");
			const GET_EXCLUDED_GLOBAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getExcludedGlobalPostHooks");

			GET_POST_HOOKS_STUB.returns([GLOBAL_HOOK, IGNORED_HOOK]);
			GET_LOCAL_HOOKS_STUB.returns([LOCAL_HOOK]);
			GET_EXCLUDED_GLOBAL_HOOKS_STUB.returns([IgnoredHook]);
			RUN_POST_HOOKS_STUB.callThrough();

			const RESULT: unknown = ReflectUtility.Call(Server, "RunPostHooks", ENDPOINT, CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(GET_POST_HOOKS_STUB.callCount, 1, "'HookRegistry.GetPostHooks' should have been called exactly once");
			strictEqual(GET_LOCAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getPostHooks' should have been called exactly once");
			strictEqual(GET_EXCLUDED_GLOBAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getExcludedGlobalPostHooks' should have been called exactly once");
			strictEqual(GLOBAL_HOOK_STUB.callCount, 1, "Global post-hook method 'execute' should have been called exactly once");
			deepStrictEqual(GLOBAL_HOOK_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
			strictEqual(IGNORED_HOOK_STUB.callCount, 0, "Excluded global post-hook method 'execute' should not have been called");
			strictEqual(LOCAL_HOOK_STUB.callCount, 1, "Local post-hook method 'execute' should have been called exactly once");
			deepStrictEqual(LOCAL_HOOK_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
		});

		it("should run all global, unless excluded, and local error-hooks", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			class GlobalHook extends BaseErrorHook
			{
				public override execute(): void {}
			}

			class IgnoredHook extends BaseErrorHook
			{
				public override execute(): void {}
			}

			class LocalHook extends BaseErrorHook
			{
				public override execute(): void {}
			}

			const GLOBAL_HOOK: GlobalHook = new GlobalHook();
			const IGNORED_HOOK: IgnoredHook = new IgnoredHook();
			const LOCAL_HOOK: LocalHook = new LocalHook();
			const GLOBAL_HOOK_STUB: SinonStub = stub(GLOBAL_HOOK, "execute");
			const IGNORED_HOOK_STUB: SinonStub = stub(IGNORED_HOOK, "execute");
			const LOCAL_HOOK_STUB: SinonStub = stub(LOCAL_HOOK, "execute");

			class DummyEndpoint extends BaseEndpoint
			{
				protected method: HTTPMethodEnum = HTTPMethodEnum.GET;
				protected route: string = "/alpha-omega/(?<slug>[a-z-]+)";

				public async execute(): Promise<void> {}
			}

			const ENDPOINT: DummyEndpoint = new DummyEndpoint();
			const GET_LOCAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getErrorHooks");
			const GET_EXCLUDED_GLOBAL_HOOKS_STUB: SinonStub = stub(ENDPOINT, "getExcludedGlobalErrorHooks");

			GET_ERROR_HOOKS_STUB.returns([GLOBAL_HOOK, IGNORED_HOOK]);
			GET_LOCAL_HOOKS_STUB.returns([LOCAL_HOOK]);
			GET_EXCLUDED_GLOBAL_HOOKS_STUB.returns([IgnoredHook]);
			RUN_ERROR_HOOKS_STUB.callThrough();

			const ERROR: Error = new Error("Test Error");

			const RESULT: unknown = ReflectUtility.Call(Server, "RunErrorHooks", ENDPOINT, CONTEXT_MOCK.instance, ERROR);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(GET_ERROR_HOOKS_STUB.callCount, 1, "'HookRegistry.GetErrorHooks' should have been called exactly once");
			strictEqual(GET_LOCAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getErrorHooks' should have been called exactly once");
			strictEqual(GET_EXCLUDED_GLOBAL_HOOKS_STUB.callCount, 1, "Endpoint method 'getExcludedGlobalErrorHooks' should have been called exactly once");
			strictEqual(GLOBAL_HOOK_STUB.callCount, 1, "Global error hook method 'execute' should have been called exactly once");
			deepStrictEqual(GLOBAL_HOOK_STUB.firstCall.args, [CONTEXT_MOCK.instance, ERROR]);
			strictEqual(IGNORED_HOOK_STUB.callCount, 0, "Excluded global error hook method 'execute' should not have been called");
			strictEqual(LOCAL_HOOK_STUB.callCount, 1, "Local error hook method 'execute' should have been called exactly once");
			deepStrictEqual(LOCAL_HOOK_STUB.firstCall.args, [CONTEXT_MOCK.instance, ERROR]);
		});
	});

	describe("RunErrorHooks", (): void => {});

	describe("start", (): void => {
		it("should start the server", (): void => {
			const CONFIG: UnsafeServerInstantiationInterface = {
				https: false,
				port: 80,
			};

			// @ts-expect-error: For testing purposes
			const SERVER: Server = new Server(CONFIG);

			SERVER.start();

			strictEqual(UNSAFE_LISTEN_STUB.callCount, 1, "The 'listen' method of the native server should be called");
			strictEqual(UNSAFE_LISTEN_STUB.firstCall.firstArg, 80);
		});
	});

	describe("isHTTPS", (): void => {
		it("should return false if the server is not secure", (): void => {
			// @ts-expect-error: For testing purposes
			const SERVER: Server = new Server({ https: false, port: 80 });

			strictEqual(SERVER.isHTTPS(), false);
		});

		it("should return true if the server is secure", (): void => {
			// @ts-expect-error: For testing purposes
			const SERVER: Server = new Server({ https: false, port: 80 });

			ReflectUtility.Set(SERVER, "https", true);

			strictEqual(SERVER.isHTTPS(), true);
		});
	});
});
