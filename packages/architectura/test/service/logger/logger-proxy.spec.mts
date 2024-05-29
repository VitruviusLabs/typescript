import { afterEach, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { ExecutionContextRegistry, LogLevelEnum, LoggerProxy, type LoggerService, Server } from "../../../src/_index.mjs";
import { asStub } from "../../utils/as-stub.mjs";

describe("LoggerProxy", (): void => {
	const LOGGER_SERVICE: LoggerService = Reflect.get(LoggerProxy, "Logger");

	describe("Initialize", (): void => {
		afterEach((): void => {
			Reflect.set(LoggerProxy, "Initialised", false);
			Reflect.set(LoggerProxy, "Logger", LOGGER_SERVICE);
		});

		it("should initialize the logger proxy with a custom logger", (): void => {
			// @ts-expect-error: Dummy value for testing purposes
			const NEW_LOGGER_SERVICE: LoggerService = Symbol("logger-service");

			strictEqual(Reflect.get(LoggerProxy, "Initialised"), false);
			strictEqual(Reflect.get(LoggerProxy, "Logger"), LOGGER_SERVICE);

			LoggerProxy.Initialise(NEW_LOGGER_SERVICE);

			strictEqual(Reflect.get(LoggerProxy, "Initialised"), true);
			strictEqual(Reflect.get(LoggerProxy, "Logger"), NEW_LOGGER_SERVICE);
		});

		it("should initialize the logger proxy with a custom logger, but only once", (): void => {
			// @ts-expect-error: Dummy value for testing purposes
			const NEW_LOGGER_SERVICE: LoggerService = Symbol("logger-service");
			// @ts-expect-error: Dummy value for testing purposes
			const OTHER_LOGGER_SERVICE: LoggerService = Symbol("logger-service");

			strictEqual(Reflect.get(LoggerProxy, "Initialised"), false);
			strictEqual(Reflect.get(LoggerProxy, "Logger"), LOGGER_SERVICE);

			LoggerProxy.Initialise(NEW_LOGGER_SERVICE);

			strictEqual(Reflect.get(LoggerProxy, "Initialised"), true);
			strictEqual(Reflect.get(LoggerProxy, "Logger"), NEW_LOGGER_SERVICE);

			LoggerProxy.Initialise(OTHER_LOGGER_SERVICE);

			strictEqual(Reflect.get(LoggerProxy, "Initialised"), true);
			strictEqual(Reflect.get(LoggerProxy, "Logger"), NEW_LOGGER_SERVICE);
		});
	});

	describe("Levels", (): void => {
		beforeEach((): void => {
			// @ts-expect-error: Stub private method
			stub(LoggerProxy, "Process");
		});

		afterEach((): void => {
			asStub(Reflect.get(LoggerProxy, "Process")).restore();
		});

		describe("Debug", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.DEBUG,
					undefined,
				];

				LoggerProxy.Debug("Hello, World!");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.DEBUG,
					"Lorem ipsum",
				];

				LoggerProxy.Debug("Hello, World!", "Lorem ipsum");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Informational", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.INFO,
					undefined,
				];

				LoggerProxy.Informational("Hello, World!");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.INFO,
					"Lorem ipsum",
				];

				LoggerProxy.Informational("Hello, World!", "Lorem ipsum");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Info", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.INFO,
					undefined,
				];

				LoggerProxy.Info("Hello, World!");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.INFO,
					"Lorem ipsum",
				];

				LoggerProxy.Info("Hello, World!", "Lorem ipsum");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Notice", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.NOTICE,
					undefined,
				];

				LoggerProxy.Notice("Hello, World!");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.NOTICE,
					"Lorem ipsum",
				];

				LoggerProxy.Notice("Hello, World!", "Lorem ipsum");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Warning", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.WARNING,
					undefined,
				];

				LoggerProxy.Warning("Hello, World!");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.WARNING,
					"Lorem ipsum",
				];

				LoggerProxy.Warning("Hello, World!", "Lorem ipsum");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Error", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.ERROR,
					undefined,
				];

				LoggerProxy.Error("Hello, World!");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.ERROR,
					"Lorem ipsum",
				];

				LoggerProxy.Error("Hello, World!", "Lorem ipsum");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Critical", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.CRITICAL,
					undefined,
				];

				LoggerProxy.Critical("Hello, World!");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.CRITICAL,
					"Lorem ipsum",
				];

				LoggerProxy.Critical("Hello, World!", "Lorem ipsum");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Alert", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.ALERT,
					undefined,
				];

				LoggerProxy.Alert("Hello, World!");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.ALERT,
					"Lorem ipsum",
				];

				LoggerProxy.Alert("Hello, World!", "Lorem ipsum");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Emergency", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.EMERGENCY,
					undefined,
				];

				LoggerProxy.Emergency("Hello, World!");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Hello, World!",
					LogLevelEnum.EMERGENCY,
					"Lorem ipsum",
				];

				LoggerProxy.Emergency("Hello, World!", "Lorem ipsum");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});
	});

	describe("Process", (): void => {
		beforeEach((): void => {
			stub(LOGGER_SERVICE, "handleMessage").rejects();
			stub(LOGGER_SERVICE, "handleError").rejects();

			// @ts-expect-error: Only getUUID() is needed
			stub(ExecutionContextRegistry, "GetUnsafeExecutionContext").returns({
				getUUID: (): string => {
					return "lorem-ipsum";
				},
			});
		});

		afterEach((): void => {
			asStub(LOGGER_SERVICE.handleMessage).restore();
			asStub(LOGGER_SERVICE.handleError).restore();
			asStub(ExecutionContextRegistry.GetUnsafeExecutionContext).restore();
		});

		it("should pass the message to the logger with the contextual informations", async (): Promise<void> => {
			const STUB: SinonStub = asStub(LOGGER_SERVICE.handleMessage);

			STUB.resolves();

			const PARAMETERS: Array<unknown> = [
				"Hello, World!",
				{
					level: LogLevelEnum.DEBUG,
					uuid: "lorem-ipsum",
					tag: undefined,
				},
			];

			await Reflect.get(LoggerProxy, "Process").call(LoggerProxy, "Hello, World!", LogLevelEnum.DEBUG, undefined);

			strictEqual(STUB.calledOnce, true, "'handleMessage' should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, PARAMETERS);
		});

		it("should pass the error to the logger with the contextual informations", async (): Promise<void> => {
			const STUB: SinonStub = asStub(LOGGER_SERVICE.handleError);

			STUB.resolves();

			const ERROR: Error = new Error("Dummy error");

			try
			{
				throw ERROR;
			}
			catch
			{
				/* Do nothing */
			}

			const PARAMETERS: Array<unknown> = [
				ERROR,
				{
					level: LogLevelEnum.ERROR,
					uuid: "lorem-ipsum",
					tag: "Lorem ipsum",
				},
			];

			await Reflect.get(LoggerProxy, "Process").call(LoggerProxy, ERROR, LogLevelEnum.ERROR, "Lorem ipsum");

			strictEqual(STUB.calledOnce, true, "'handleError' should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, PARAMETERS);
		});

		it("should manage errors without interrupting the app", async (): Promise<void> => {
			const ERROR: Error = new Error("Dummy logging error");

			const STUB: SinonStub = asStub(LOGGER_SERVICE.handleMessage);
			const HANDLE_ERROR_STUB: SinonStub = stub(Server, "HandleError");

			STUB.rejects(ERROR);
			HANDLE_ERROR_STUB.rejects();

			const PROMISE: Promise<void> = Reflect.get(LoggerProxy, "Process").call(LoggerProxy, "Hello, World!", LogLevelEnum.DEBUG, undefined);

			await doesNotReject(PROMISE);
			strictEqual(HANDLE_ERROR_STUB.calledOnce, true, "'Server.HandleError' should be called exactly once");
			deepStrictEqual(HANDLE_ERROR_STUB.firstCall.args, [ERROR]);

			HANDLE_ERROR_STUB.restore();
		});
	});
});
