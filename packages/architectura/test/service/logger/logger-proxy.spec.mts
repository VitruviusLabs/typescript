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
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.DEBUG,
					undefined,
				];

				LoggerProxy.Debug("Lorem ipsum dolor sit amet");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.DEBUG,
					"Consectetur",
				];

				LoggerProxy.Debug("Lorem ipsum dolor sit amet", "Consectetur");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Informational", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.INFO,
					undefined,
				];

				LoggerProxy.Informational("Lorem ipsum dolor sit amet");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.INFO,
					"Consectetur",
				];

				LoggerProxy.Informational("Lorem ipsum dolor sit amet", "Consectetur");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Info", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.INFO,
					undefined,
				];

				LoggerProxy.Info("Lorem ipsum dolor sit amet");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.INFO,
					"Consectetur",
				];

				LoggerProxy.Info("Lorem ipsum dolor sit amet", "Consectetur");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Notice", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.NOTICE,
					undefined,
				];

				LoggerProxy.Notice("Lorem ipsum dolor sit amet");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.NOTICE,
					"Consectetur",
				];

				LoggerProxy.Notice("Lorem ipsum dolor sit amet", "Consectetur");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Warning", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.WARNING,
					undefined,
				];

				LoggerProxy.Warning("Lorem ipsum dolor sit amet");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.WARNING,
					"Consectetur",
				];

				LoggerProxy.Warning("Lorem ipsum dolor sit amet", "Consectetur");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Error", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.ERROR,
					undefined,
				];

				LoggerProxy.Error("Lorem ipsum dolor sit amet");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.ERROR,
					"Consectetur",
				];

				LoggerProxy.Error("Lorem ipsum dolor sit amet", "Consectetur");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Critical", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.CRITICAL,
					undefined,
				];

				LoggerProxy.Critical("Lorem ipsum dolor sit amet");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.CRITICAL,
					"Consectetur",
				];

				LoggerProxy.Critical("Lorem ipsum dolor sit amet", "Consectetur");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Alert", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.ALERT,
					undefined,
				];

				LoggerProxy.Alert("Lorem ipsum dolor sit amet");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.ALERT,
					"Consectetur",
				];

				LoggerProxy.Alert("Lorem ipsum dolor sit amet", "Consectetur");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});
		});

		describe("Emergency", (): void => {
			it("should pass to the Process private method the message, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.EMERGENCY,
					undefined,
				];

				LoggerProxy.Emergency("Lorem ipsum dolor sit amet");

				strictEqual(STUB.calledOnce, true, "'Process' should be called exactly once");
				deepStrictEqual(STUB.firstCall.args, PARAMETERS);
			});

			it("should pass to the Process private method the Error, log level, and optional tag", (): void => {
				const STUB: SinonStub = asStub(Reflect.get(LoggerProxy, "Process"));

				const PARAMETERS: Array<unknown> = [
					"Lorem ipsum dolor sit amet",
					LogLevelEnum.EMERGENCY,
					"Consectetur",
				];

				LoggerProxy.Emergency("Lorem ipsum dolor sit amet", "Consectetur");

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
				"Lorem ipsum dolor sit amet",
				{
					level: LogLevelEnum.DEBUG,
					uuid: "lorem-ipsum",
					tag: undefined,
				},
			];

			await Reflect.get(LoggerProxy, "Process").call(LoggerProxy, "Lorem ipsum dolor sit amet", LogLevelEnum.DEBUG, undefined);

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
					tag: "Consectetur",
				},
			];

			await Reflect.get(LoggerProxy, "Process").call(LoggerProxy, ERROR, LogLevelEnum.ERROR, "Consectetur");

			strictEqual(STUB.calledOnce, true, "'handleError' should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, PARAMETERS);
		});

		it("should manage errors without interrupting the app", async (): Promise<void> => {
			const ERROR: Error = new Error("Dummy logging error");

			const STUB: SinonStub = asStub(LOGGER_SERVICE.handleMessage);
			const HANDLE_ERROR_STUB: SinonStub = stub(Server, "HandleError");

			STUB.rejects(ERROR);
			HANDLE_ERROR_STUB.rejects();

			const PROMISE: Promise<void> = Reflect.get(LoggerProxy, "Process").call(LoggerProxy, "Lorem ipsum dolor sit amet", LogLevelEnum.DEBUG, undefined);

			await doesNotReject(PROMISE);
			strictEqual(HANDLE_ERROR_STUB.calledOnce, true, "'Server.HandleError' should be called exactly once");
			deepStrictEqual(HANDLE_ERROR_STUB.firstCall.args, [ERROR]);

			HANDLE_ERROR_STUB.restore();
		});
	});
});
