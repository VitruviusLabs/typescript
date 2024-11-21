import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, ok, strictEqual } from "node:assert";
import { Server as UnsafeServer } from "node:http";
import { Server as SecureServer } from "node:https";
import { type SinonStub, stub } from "sinon";
import { ReflectUtility, instanceOf } from "@vitruvius-labs/toolbox";
import { AssetRegistry, BaseEndpoint, type EndpointMatchInterface, EndpointRegistry, ExecutionContext, ExecutionContextRegistry, FileSystemService, HTTPMethodEnum, HTTPStatusCodeEnum, HookService, LoggerProxy, type SecureServerInstantiationInterface, Server, type UnsafeServerInstantiationInterface } from "../../../src/_index.mjs";
import { mockContext } from "../../../mock/core/mock-context.mjs";
import type { MockContextInterface } from "../../../mock/core/_index.mjs";

describe("Server", (): void => {
	// @ts-expect-error: Stubbing a private method
	const HANDLE_PUBLIC_ASSETS_STUB: SinonStub = stub(Server, "HandlePublicAssets");
	// @ts-expect-error: Stubbing a private method
	const HANDLE_ENDPOINTS_STUB: SinonStub = stub(Server, "HandleEndpoints");
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
	const RUN_PRE_HOOKS_STUB: SinonStub = stub(HookService, "RunPreHooks");
	const RUN_POST_HOOKS_STUB: SinonStub = stub(HookService, "RunPostHooks");
	const RUN_ERROR_HOOKS_STUB: SinonStub = stub(HookService, "RunErrorHooks");
	const RUN_FALLBACK_ERROR_HOOKS_STUB: SinonStub = stub(HookService, "RunFallbackErrorHooks");
	const FIND_ENDPOINT_STUB: SinonStub = stub(EndpointRegistry, "FindEndpoint");
	const FIND_PUBLIC_ASSET_STUB: SinonStub = stub(AssetRegistry, "FindPublicAsset");
	const READ_FILE_STUB: SinonStub = stub(FileSystemService, "ReadBinaryFile");

	beforeEach((): void => {
		HANDLE_PUBLIC_ASSETS_STUB.reset();
		HANDLE_PUBLIC_ASSETS_STUB.callThrough();
		HANDLE_ENDPOINTS_STUB.reset();
		HANDLE_ENDPOINTS_STUB.callThrough();
		FINALIZE_RESPONSE_STUB.reset();
		FINALIZE_RESPONSE_STUB.callThrough();
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
		GET_CONTEXT_STUB.callThrough();
		SET_CONTEXT_STUB.reset();
		SET_CONTEXT_STUB.callThrough();
		RUN_PRE_HOOKS_STUB.reset();
		RUN_PRE_HOOKS_STUB.resolves();
		RUN_POST_HOOKS_STUB.reset();
		RUN_POST_HOOKS_STUB.resolves();
		RUN_ERROR_HOOKS_STUB.reset();
		RUN_ERROR_HOOKS_STUB.resolves();
		RUN_FALLBACK_ERROR_HOOKS_STUB.reset();
		RUN_FALLBACK_ERROR_HOOKS_STUB.resolves();
		FIND_ENDPOINT_STUB.reset();
		FIND_ENDPOINT_STUB.callThrough();
		FIND_PUBLIC_ASSET_STUB.reset();
		FIND_PUBLIC_ASSET_STUB.callThrough();
		READ_FILE_STUB.reset();
		READ_FILE_STUB.callThrough();
	});

	after((): void => {
		HANDLE_PUBLIC_ASSETS_STUB.restore();
		HANDLE_ENDPOINTS_STUB.restore();
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
		RUN_PRE_HOOKS_STUB.restore();
		RUN_POST_HOOKS_STUB.restore();
		RUN_ERROR_HOOKS_STUB.restore();
		RUN_FALLBACK_ERROR_HOOKS_STUB.restore();
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

			strictEqual(SERVER["https"], false);
			strictEqual(SERVER["port"], 80);
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

			strictEqual(SERVER["https"], false);
			strictEqual(SERVER["port"], 80);
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
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			GET_CONTEXT_STUB.returns(CONTEXT_MOCK.instance);
			FINALIZE_RESPONSE_STUB.resolves();

			const ERROR: Error = new Error("Test Error");

			await Server.HandleError(ERROR);

			strictEqual(RUN_FALLBACK_ERROR_HOOKS_STUB.callCount, 1, "'HookService.RunFallbackErrorHooks' should have been called");
			deepStrictEqual(RUN_FALLBACK_ERROR_HOOKS_STUB.firstCall.args, [CONTEXT_MOCK.instance, ERROR]);
			strictEqual(FINALIZE_RESPONSE_STUB.callCount, 1, "'Server.FinalizeResponse' should have been called");
			deepStrictEqual(FINALIZE_RESPONSE_STUB.firstCall.args, [CONTEXT_MOCK.instance, true]);
		});

		it("should be safe (without context)", async (): Promise<void> => {
			LOGGER_ERROR_STUB.throws();

			await doesNotReject(Server.HandleError(new Error("Test Error")));
			strictEqual(LOGGER_ERROR_STUB.callCount, 1, "'LoggerProxy.Error' method should have been called");
		});

		it("should be safe (with context)", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			GET_CONTEXT_STUB.returns(CONTEXT_MOCK.instance);

			RUN_FALLBACK_ERROR_HOOKS_STUB.rejects();
			FINALIZE_RESPONSE_STUB.rejects();

			await doesNotReject(Server.HandleError(new Error("Test Error")));
			strictEqual(FINALIZE_RESPONSE_STUB.callCount, 1, "'Server.FinalizeResponse' method should have been called");
			strictEqual(LOGGER_ERROR_STUB.callCount, 1, "'LoggerProxy.Error' method should have been called");
		});
	});

	describe("RequestListener", (): void => {
		it("should initialize the request", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_PUBLIC_ASSETS_STUB.resolves(true);
			HANDLE_ENDPOINTS_STUB.resolves(true);

			const RESULT: unknown = Server["RequestListener"](CONTEXT_MOCK.request.instance, CONTEXT_MOCK.response.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(CONTEXT_MOCK.request.stubs.initialize.callCount, 1, "The 'initialize' method of the request should have been called exactly once");
		});

		it("should create the context", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			CREATE_CONTEXT_STUB.returns(CONTEXT_MOCK.instance);

			HANDLE_PUBLIC_ASSETS_STUB.resolves(true);
			HANDLE_ENDPOINTS_STUB.resolves(true);

			const RESULT: unknown = Server["RequestListener"](CONTEXT_MOCK.request.instance, CONTEXT_MOCK.response.instance);

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

			HANDLE_PUBLIC_ASSETS_STUB.resolves(true);
			HANDLE_ENDPOINTS_STUB.resolves(true);

			const RESULT: unknown = Server["RequestListener"](CONTEXT_MOCK.request.instance, CONTEXT_MOCK.response.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(HANDLE_PUBLIC_ASSETS_STUB.callCount, 1, "'Server.HandlePublicAssets' should have been called exactly once");
			deepStrictEqual(HANDLE_PUBLIC_ASSETS_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
		});

		it("should test for endpoints if no public asset match", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			CREATE_CONTEXT_STUB.returns(CONTEXT_MOCK.instance);

			HANDLE_PUBLIC_ASSETS_STUB.resolves(false);
			HANDLE_ENDPOINTS_STUB.resolves(true);

			const RESULT: unknown = Server["RequestListener"](CONTEXT_MOCK.request.instance, CONTEXT_MOCK.response.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(HANDLE_ENDPOINTS_STUB.callCount, 1, "'Server.HandleEndpoints' should have been called exactly once");
			deepStrictEqual(HANDLE_ENDPOINTS_STUB.firstCall.args, [CONTEXT_MOCK.instance]);
		});

		it("should respond if nothing match", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			HANDLE_PUBLIC_ASSETS_STUB.resolves(false);
			HANDLE_ENDPOINTS_STUB.resolves(false);

			CREATE_CONTEXT_STUB.returns(CONTEXT_MOCK.instance);

			const RESULT: unknown = Server["RequestListener"](CONTEXT_MOCK.request.instance, CONTEXT_MOCK.response.instance);

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

				const RESULT: unknown = Server["HandlePublicAssets"](CONTEXT_MOCK.instance);

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

			const RESULT: unknown = Server["HandlePublicAssets"](CONTEXT_MOCK.instance);

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

			const RESULT: unknown = Server["HandlePublicAssets"](CONTEXT_MOCK.instance);

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

			const RESULT: unknown = Server["HandleEndpoints"](CONTEXT_MOCK.instance);

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

			const RESULT: unknown = Server["HandleEndpoints"](CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, true);
			deepStrictEqual(CONTEXT_MOCK.request.instance["pathMatchGroups"], { slug: "lorem-ipsum" });
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

			const RESULT: unknown = Server["HandleEndpoints"](CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, true);
			deepStrictEqual(ENDPOINT["context"], CONTEXT_MOCK.instance);
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

			const RESULT: unknown = Server["HandleEndpoints"](CONTEXT_MOCK.instance);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, true);
			deepStrictEqual(ENDPOINT["context"], undefined);
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

			const RESULT: unknown = Server["HandleEndpoints"](CONTEXT_MOCK.instance);

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

			const RESULT: unknown = Server["HandleEndpoints"](CONTEXT_MOCK.instance);

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

			const RESULT: unknown = Server["HandleEndpoints"](CONTEXT_MOCK.instance);

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

			const RESULT: unknown = Server["HandleEndpoints"](CONTEXT_MOCK.instance);

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

	describe("FinalizeResponse", (): void => {
		it("should do nothing if the response is locked or processed", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			FINALIZE_RESPONSE_STUB.callThrough();
			CONTEXT_MOCK.response.stubs.isLocked.returns(true);
			CONTEXT_MOCK.response.stubs.isProcessed.returns(true);

			const RESULT: unknown = Server["FinalizeResponse"](CONTEXT_MOCK.instance, false);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(CONTEXT_MOCK.response.stubs.replyWith.callCount, 0, "The response method 'replyWith' should not have been called");
		});

		it("should log a warning if the response is locked but not processed", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			FINALIZE_RESPONSE_STUB.callThrough();
			CONTEXT_MOCK.response.stubs.isLocked.returns(true);
			CONTEXT_MOCK.response.stubs.isProcessed.returns(false);

			const RESULT: unknown = Server["FinalizeResponse"](CONTEXT_MOCK.instance, false);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(CONTEXT_MOCK.response.stubs.replyWith.callCount, 0, "The response method 'replyWith' should not have been called");
			strictEqual(LOGGER_WARNING_STUB.callCount, 1, "The method 'LoggerProxy.Warning' should not have been called exactly once");
			deepStrictEqual(LOGGER_WARNING_STUB.firstCall.args, ["Unfinished server response."]);
		});

		it("should respond with a 404 if no error occurred", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			FINALIZE_RESPONSE_STUB.callThrough();
			CONTEXT_MOCK.response.stubs.isLocked.returns(false);
			CONTEXT_MOCK.response.stubs.isProcessed.returns(false);

			const RESULT: unknown = Server["FinalizeResponse"](CONTEXT_MOCK.instance, false);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(CONTEXT_MOCK.response.stubs.replyWith.callCount, 1, "The response method 'replyWith' should have been called exactly once");
			deepStrictEqual(CONTEXT_MOCK.response.stubs.replyWith.firstCall.args, [{ status: HTTPStatusCodeEnum.NOT_FOUND, payload: "404 - Not found." }]);
		});

		it("should respond with a 500 if an error occurred", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			FINALIZE_RESPONSE_STUB.callThrough();
			CONTEXT_MOCK.response.stubs.isLocked.returns(false);
			CONTEXT_MOCK.response.stubs.isProcessed.returns(false);

			const RESULT: unknown = Server["FinalizeResponse"](CONTEXT_MOCK.instance, true);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(CONTEXT_MOCK.response.stubs.replyWith.callCount, 1, "The response method 'replyWith' should have been called exactly once");
			deepStrictEqual(CONTEXT_MOCK.response.stubs.replyWith.firstCall.args, [{ status: HTTPStatusCodeEnum.INTERNAL_SERVER_ERROR, payload: "500 - Internal Server Error." }]);
		});

		it("should remove existing headers if the response is not locked", async (): Promise<void> => {
			const CONTEXT_MOCK: MockContextInterface = mockContext();

			FINALIZE_RESPONSE_STUB.callThrough();
			CONTEXT_MOCK.response.stubs.isLocked.returns(false);
			CONTEXT_MOCK.response.stubs.isProcessed.returns(false);
			CONTEXT_MOCK.response.stubs.getHeaderNames.returns(["Alpha", "Omega"]);

			const RESULT: unknown = Server["FinalizeResponse"](CONTEXT_MOCK.instance, false);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(CONTEXT_MOCK.response.stubs.getHeaderNames.callCount, 1, "The response method 'getHeaderNames' should have been called exactly once");
			strictEqual(CONTEXT_MOCK.response.stubs.removeHeader.callCount, 2, "The response method 'getHeaderNames' should have been called for each header");
			deepStrictEqual(CONTEXT_MOCK.response.stubs.removeHeader.firstCall.args, ["Alpha"]);
			deepStrictEqual(CONTEXT_MOCK.response.stubs.removeHeader.secondCall.args, ["Omega"]);
		});
	});

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
