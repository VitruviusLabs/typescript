import { after, afterEach, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { ReflectUtility, instanceOf } from "@vitruvius-labs/toolbox";
import { ExecutionContextRegistry, LogLevelEnum, LoggerProxy, type LoggerService, Server } from "../../../src/_index.mjs";
import { mockContext } from "../../../mock/_index.mjs";

describe("LoggerProxy", (): void => {
	const LOGGER_SERVICE: LoggerService = Reflect.get(LoggerProxy, "Logger");
	// @ts-expect-error: Stub private method
	const LOGGER_PROXY_PROCESS_STUB: SinonStub = stub(LoggerProxy, "Process");
	const SERVER_HANDLE_ERROR_STUB: SinonStub = stub(Server, "HandleError");
	const HANDLE_MESSAGE_STUB: SinonStub = stub(LOGGER_SERVICE, "handleMessage");
	const HANDLE_ERROR_STUB: SinonStub = stub(LOGGER_SERVICE, "handleError");
	const GET_CONTEXT_STUB: SinonStub = stub(ExecutionContextRegistry, "GetUnsafeExecutionContext");

	beforeEach((): void => {
		LOGGER_PROXY_PROCESS_STUB.reset();
		LOGGER_PROXY_PROCESS_STUB.returns(undefined);
		SERVER_HANDLE_ERROR_STUB.reset();
		SERVER_HANDLE_ERROR_STUB.returns(undefined);
		HANDLE_MESSAGE_STUB.reset();
		HANDLE_MESSAGE_STUB.returns(undefined);
		HANDLE_ERROR_STUB.reset();
		HANDLE_ERROR_STUB.returns(undefined);
		GET_CONTEXT_STUB.reset();
		GET_CONTEXT_STUB.returns(mockContext().instance);
	});

	after((): void => {
		LOGGER_PROXY_PROCESS_STUB.restore();
		SERVER_HANDLE_ERROR_STUB.restore();
		HANDLE_MESSAGE_STUB.restore();
		HANDLE_ERROR_STUB.restore();
		GET_CONTEXT_STUB.restore();
	});

	describe("Initialize", (): void => {
		afterEach((): void => {
			ReflectUtility.Set(LoggerProxy, "Initialised", false);
			ReflectUtility.Set(LoggerProxy, "Logger", LOGGER_SERVICE);
		});

		it("should initialize the logger proxy with a custom logger", (): void => {
			// @ts-expect-error: Dummy value for testing purposes
			const NEW_LOGGER_SERVICE: LoggerService = Symbol("logger-service");

			strictEqual(LoggerProxy["Initialised"], false);
			strictEqual(LoggerProxy["Logger"], LOGGER_SERVICE);

			LoggerProxy.Initialise(NEW_LOGGER_SERVICE);

			strictEqual(LoggerProxy["Initialised"], true);
			strictEqual(LoggerProxy["Logger"], NEW_LOGGER_SERVICE);
		});

		it("should initialize the logger proxy with a custom logger, but only once", (): void => {
			// @ts-expect-error: Dummy value for testing purposes
			const NEW_LOGGER_SERVICE: LoggerService = Symbol("logger-service");
			// @ts-expect-error: Dummy value for testing purposes
			const OTHER_LOGGER_SERVICE: LoggerService = Symbol("logger-service");

			strictEqual(LoggerProxy["Initialised"], false);
			strictEqual(LoggerProxy["Logger"], LOGGER_SERVICE);

			LoggerProxy.Initialise(NEW_LOGGER_SERVICE);

			strictEqual(LoggerProxy["Initialised"], true);
			strictEqual(LoggerProxy["Logger"], NEW_LOGGER_SERVICE);

			LoggerProxy.Initialise(OTHER_LOGGER_SERVICE);

			strictEqual(LoggerProxy["Initialised"], true);
			strictEqual(LoggerProxy["Logger"], NEW_LOGGER_SERVICE);
		});
	});

	describe("Levels", (): void => {
		describe("Debug", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.DEBUG,
					undefined,
				];

				LoggerProxy.Debug("Hello, World!");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.DEBUG,
					"Lorem ipsum",
				];

				LoggerProxy.Debug("Hello, World!", "Lorem ipsum");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Informational", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.INFO,
					undefined,
				];

				LoggerProxy.Informational("Hello, World!");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.INFO,
					"Lorem ipsum",
				];

				LoggerProxy.Informational("Hello, World!", "Lorem ipsum");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Info", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.INFO,
					undefined,
				];

				LoggerProxy.Info("Hello, World!");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.INFO,
					"Lorem ipsum",
				];

				LoggerProxy.Info("Hello, World!", "Lorem ipsum");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Notice", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.NOTICE,
					undefined,
				];

				LoggerProxy.Notice("Hello, World!");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.NOTICE,
					"Lorem ipsum",
				];

				LoggerProxy.Notice("Hello, World!", "Lorem ipsum");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Warning", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.WARNING,
					undefined,
				];

				LoggerProxy.Warning("Hello, World!");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.WARNING,
					"Lorem ipsum",
				];

				LoggerProxy.Warning("Hello, World!", "Lorem ipsum");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Error", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.ERROR,
					undefined,
				];

				LoggerProxy.Error("Hello, World!");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.ERROR,
					"Lorem ipsum",
				];

				LoggerProxy.Error("Hello, World!", "Lorem ipsum");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Critical", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.CRITICAL,
					undefined,
				];

				LoggerProxy.Critical("Hello, World!");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.CRITICAL,
					"Lorem ipsum",
				];

				LoggerProxy.Critical("Hello, World!", "Lorem ipsum");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Alert", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.ALERT,
					undefined,
				];

				LoggerProxy.Alert("Hello, World!");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.ALERT,
					"Lorem ipsum",
				];

				LoggerProxy.Alert("Hello, World!", "Lorem ipsum");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Emergency", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.EMERGENCY,
					undefined,
				];

				LoggerProxy.Emergency("Hello, World!");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.EMERGENCY,
					"Lorem ipsum",
				];

				LoggerProxy.Emergency("Hello, World!", "Lorem ipsum");

				strictEqual(LOGGER_PROXY_PROCESS_STUB.callCount, 1, "'Process' should be called exactly once");
				deepStrictEqual(LOGGER_PROXY_PROCESS_STUB.firstCall.args, PARAMETERS);
			});
		});
	});

	describe("Process", (): void => {
		it("should pass the message to the logger with the contextual informations", async (): Promise<void> => {
			LOGGER_PROXY_PROCESS_STUB.callThrough();
			HANDLE_MESSAGE_STUB.resolves();

			const PARAMETERS: Array<unknown> = [
				"Hello, World!",
				{
					level: LogLevelEnum.DEBUG,
					uuid: "00000000-0000-0000-0000-000000000000",
					tag: undefined,
				},
			];

			const PROMISE: unknown = LoggerProxy["Process"]("Hello, World!", LogLevelEnum.DEBUG, undefined);

			instanceOf(PROMISE, Promise);
			await PROMISE;
			strictEqual(HANDLE_MESSAGE_STUB.callCount, 1, "'handleMessage' should be called exactly once");
			deepStrictEqual(HANDLE_MESSAGE_STUB.firstCall.args, PARAMETERS);
		});

		it("should pass the error to the logger with the contextual informations", async (): Promise<void> => {
			LOGGER_PROXY_PROCESS_STUB.callThrough();
			HANDLE_ERROR_STUB.resolves();

			const ERROR: Error = new Error("Dummy error");

			const PARAMETERS: Array<unknown> = [
				ERROR,
				{
					level: LogLevelEnum.ERROR,
					uuid: "00000000-0000-0000-0000-000000000000",
					tag: "Lorem ipsum",
				},
			];

			const PROMISE: unknown = LoggerProxy["Process"](ERROR, LogLevelEnum.ERROR, "Lorem ipsum");

			instanceOf(PROMISE, Promise);
			await PROMISE;
			strictEqual(HANDLE_ERROR_STUB.callCount, 1, "'handleError' should be called exactly once");
			deepStrictEqual(HANDLE_ERROR_STUB.firstCall.args, PARAMETERS);
		});

		it("should manage errors without interrupting the app", async (): Promise<void> => {
			LOGGER_PROXY_PROCESS_STUB.callThrough();
			const ERROR: Error = new Error("Dummy logging error");

			HANDLE_MESSAGE_STUB.rejects(ERROR);
			SERVER_HANDLE_ERROR_STUB.resolves();

			const PROMISE: unknown = LoggerProxy["Process"]("Hello, World!", LogLevelEnum.DEBUG, undefined);

			instanceOf(PROMISE, Promise);
			await doesNotReject(PROMISE);
			strictEqual(SERVER_HANDLE_ERROR_STUB.callCount, 1, "'Server.HandleError' should be called exactly once");
			deepStrictEqual(SERVER_HANDLE_ERROR_STUB.firstCall.args, [ERROR]);
		});
	});
});
