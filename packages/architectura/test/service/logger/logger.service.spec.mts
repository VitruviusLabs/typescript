import { after, afterEach, beforeEach, describe, it } from "node:test";
import { type SinonFakeTimers, type SinonStub, stub, useFakeTimers } from "sinon";
import { LogLevelEnum, LoggerService, Singleton } from "../../../src/_index.mjs";
import { asStub } from "../../utils/as-stub.mjs";
import { deepStrictEqual, strictEqual } from "node:assert";
import { pruneIndentTrim } from "@vitruvius-labs/toolbox";
import { ValidationError } from "@vitruvius-labs/ts-predicate";

describe("LoggerService", (): void => {
	const CLOCK: SinonFakeTimers = useFakeTimers({ toFake: ["Date"] });

	beforeEach((): void => {
		// @ts-expect-error: Stubbing a private method
		stub(LoggerService, "Write").returns(undefined);
		CLOCK.reset();
		Singleton.RemoveInstance(LoggerService);
	});

	afterEach((): void => {
		asStub(Reflect.get(LoggerService, "Write")).restore();
		Singleton.RemoveInstance(LoggerService);
	});

	after((): void => {
		CLOCK.restore();
	});

	describe("handleMessage", (): void => {
		it("should log a message (simple)", (): void => {
			const STUB: SinonStub = asStub(Reflect.get(LoggerService, "Write"));
			const LOGGER_SERVICE: LoggerService = new LoggerService();

			const EXPECTED: string = pruneIndentTrim(`
				[1970-01-01 00:00:00] [INFO] - Hello, World!
			`);

			LOGGER_SERVICE.handleMessage(
				"Hello, World!",
				{
					level: LogLevelEnum.INFO,
				}
			);

			strictEqual(STUB.calledOnce, true, "'LoggerService.Write' should be called only once");
			deepStrictEqual(STUB.firstCall.args, [EXPECTED]);
		});

		it("should log a message (with uuid)", (): void => {
			const STUB: SinonStub = asStub(Reflect.get(LoggerService, "Write"));
			const LOGGER_SERVICE: LoggerService = new LoggerService();

			const EXPECTED: string = pruneIndentTrim(`
				[1970-01-01 00:00:00] [DEBUG] {00000000-0000-0000-0000-000000000000} - Hello, World!
			`);

			LOGGER_SERVICE.handleMessage(
				"Hello, World!",
				{
					level: LogLevelEnum.DEBUG,
					uuid: "00000000-0000-0000-0000-000000000000",
				}
			);

			strictEqual(STUB.calledOnce, true, "'LoggerService.Write' should be called only once");
			deepStrictEqual(STUB.firstCall.args, [EXPECTED]);
		});

		it("should log a message (with tag)", (): void => {
			const STUB: SinonStub = asStub(Reflect.get(LoggerService, "Write"));
			const LOGGER_SERVICE: LoggerService = new LoggerService();

			const EXPECTED: string = pruneIndentTrim(`
				[1970-01-01 00:00:00] [WARNING] [Lorem ipsum] - Hello, World!
			`);

			LOGGER_SERVICE.handleMessage(
				"Hello, World!",
				{
					level: LogLevelEnum.WARNING,
					tag: "Lorem ipsum",
				}
			);

			strictEqual(STUB.calledOnce, true, "'LoggerService.Write' should be called only once");
			deepStrictEqual(STUB.firstCall.args, [EXPECTED]);
		});

		it("should log a message (with uuid and tag)", (): void => {
			const STUB: SinonStub = asStub(Reflect.get(LoggerService, "Write"));
			const LOGGER_SERVICE: LoggerService = new LoggerService();

			const EXPECTED: string = pruneIndentTrim(`
				[1970-01-01 00:00:00] [CRITICAL] {00000000-0000-0000-0000-000000000000} [Lorem ipsum] - Hello, World!
			`);

			LOGGER_SERVICE.handleMessage(
				"Hello, World!",
				{
					level: LogLevelEnum.CRITICAL,
					uuid: "00000000-0000-0000-0000-000000000000",
					tag: "Lorem ipsum",
				}
			);

			strictEqual(STUB.calledOnce, true, "'LoggerService.Write' should be called only once");
			deepStrictEqual(STUB.firstCall.args, [EXPECTED]);
		});

		it("should log a message (multiline)", (): void => {
			const STUB: SinonStub = asStub(Reflect.get(LoggerService, "Write"));
			const LOGGER_SERVICE: LoggerService = new LoggerService();

			const EXPECTED: string = pruneIndentTrim(`
				[1970-01-01 00:00:00] [EMERGENCY] - Hello, World!
				[1970-01-01 00:00:00] [EMERGENCY] - Hello, World!
				[1970-01-01 00:00:00] [EMERGENCY] - Hello, World!
			`);

			LOGGER_SERVICE.handleMessage(
				"Hello, World!\nHello, World!\nHello, World!",
				{
					level: LogLevelEnum.EMERGENCY,
				}
			);

			strictEqual(STUB.calledOnce, true, "'LoggerService.Write' should be called only once");
			deepStrictEqual(STUB.firstCall.args, [EXPECTED]);
		});
	});

	describe("handleError", (): void => {
		it("should log an error (simple)", (): void => {
			const STUB: SinonStub = asStub(Reflect.get(LoggerService, "Write"));
			const LOGGER_SERVICE: LoggerService = new LoggerService();

			const EXPECTED: string = pruneIndentTrim(`
				[1970-01-01 00:00:00] [ERROR] - Hello, World!
				[1970-01-01 00:00:00] [ERROR] - ┌─────────────────────────────────┬──────┬──────────┬────────────────────────────────────────────────────────────┐
				[1970-01-01 00:00:00] [ERROR] - │             Method              │ Line │ Position │                           Module                           │
				[1970-01-01 00:00:00] [ERROR] - ├─────────────────────────────────┼──────┼──────────┼────────────────────────────────────────────────────────────┤
				[1970-01-01 00:00:00] [ERROR] - │ alpha                           │    3 │        8 │ /vitruvius-labs/typescript/packages/architectura/alpha.mjs │
				[1970-01-01 00:00:00] [ERROR] - │ beta                            │    8 │       14 │ /vitruvius-labs/typescript/packages/architectura/beta.mjs  │
				[1970-01-01 00:00:00] [ERROR] - │ >anonymous<                     │   33 │        1 │ /vitruvius-labs/typescript/packages/architectura/dummy.mjs │
				[1970-01-01 00:00:00] [ERROR] - │ ModuleJob.run                   │  222 │       25 │ node:internal/modules/esm/module_job                       │
				[1970-01-01 00:00:00] [ERROR] - │ ModuleLoader.import             │  316 │       24 │ node:internal/modules/esm/loader                           │
				[1970-01-01 00:00:00] [ERROR] - │ asyncRunEntryPointWithESMLoader │  123 │        5 │ node:internal/modules/run_main                             │
				[1970-01-01 00:00:00] [ERROR] - └─────────────────────────────────┴──────┴──────────┴────────────────────────────────────────────────────────────┘
			`);

			const ERROR: Error = new Error("Hello, World!");

			ERROR.stack = pruneIndentTrim(`
				Error: Hello, World!
					at alpha (file:///vitruvius-labs/typescript/packages/architectura/alpha.mjs:3:8)
					at beta (file:///vitruvius-labs/typescript/packages/architectura/beta.mjs:8:14)
					at file:///vitruvius-labs/typescript/packages/architectura/dummy.mjs:33:1
					at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
					at async ModuleLoader.import (node:internal/modules/esm/loader:316:24)
					at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:123:5)
			`);

			LOGGER_SERVICE.handleError(ERROR, { level: LogLevelEnum.ERROR });

			strictEqual(STUB.calledOnce, true, "'LoggerService.Write' should be called only once");
			deepStrictEqual(STUB.firstCall.args, [EXPECTED]);
		});

		it("should log an error (validation)", (): void => {
			const STUB: SinonStub = asStub(Reflect.get(LoggerService, "Write"));
			const LOGGER_SERVICE: LoggerService = new LoggerService();

			const EXPECTED: string = pruneIndentTrim(`
				[1970-01-01 00:00:00] [ERROR] - The value is an object, but some properties are incorrect.
				[1970-01-01 00:00:00] [ERROR] - ├─── The value has an extraneous property "LastName".
				[1970-01-01 00:00:00] [ERROR] - ├─── The required property "lastName" is missing.
				[1970-01-01 00:00:00] [ERROR] - └─── The property "birthDate" has an incorrect value.
				[1970-01-01 00:00:00] [ERROR] -      └─── The value must be an instance of Date.
				[1970-01-01 00:00:00] [ERROR] - ┌─────────────────────────────────┬──────┬──────────┬────────────────────────────────────────────────────────────┐
				[1970-01-01 00:00:00] [ERROR] - │             Method              │ Line │ Position │                           Module                           │
				[1970-01-01 00:00:00] [ERROR] - ├─────────────────────────────────┼──────┼──────────┼────────────────────────────────────────────────────────────┤
				[1970-01-01 00:00:00] [ERROR] - │ alpha                           │    3 │        8 │ /vitruvius-labs/typescript/packages/architectura/alpha.mjs │
				[1970-01-01 00:00:00] [ERROR] - │ beta                            │    8 │       14 │ /vitruvius-labs/typescript/packages/architectura/beta.mjs  │
				[1970-01-01 00:00:00] [ERROR] - │ >anonymous<                     │   33 │        1 │ /vitruvius-labs/typescript/packages/architectura/dummy.mjs │
				[1970-01-01 00:00:00] [ERROR] - │ ModuleJob.run                   │  222 │       25 │ node:internal/modules/esm/module_job                       │
				[1970-01-01 00:00:00] [ERROR] - │ ModuleLoader.import             │  316 │       24 │ node:internal/modules/esm/loader                           │
				[1970-01-01 00:00:00] [ERROR] - │ asyncRunEntryPointWithESMLoader │  123 │        5 │ node:internal/modules/run_main                             │
				[1970-01-01 00:00:00] [ERROR] - └─────────────────────────────────┴──────┴──────────┴────────────────────────────────────────────────────────────┘
			`);

			const ERROR: ValidationError = new ValidationError(
				"The value is an object, but some properties are incorrect.",
				[
					new ValidationError('The value has an extraneous property "LastName".', []),
					new ValidationError('The required property "lastName" is missing.', []),
					new ValidationError(
						'The property "birthDate" has an incorrect value.',
						[
							new ValidationError("The value must be an instance of Date.", []),
						]
					),
				]
			);

			ERROR.stack = pruneIndentTrim(`
				Error: Hello, World!
					at alpha (file:///vitruvius-labs/typescript/packages/architectura/alpha.mjs:3:8)
					at beta (file:///vitruvius-labs/typescript/packages/architectura/beta.mjs:8:14)
					at file:///vitruvius-labs/typescript/packages/architectura/dummy.mjs:33:1
					at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
					at async ModuleLoader.import (node:internal/modules/esm/loader:316:24)
					at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:123:5)
			`);

			LOGGER_SERVICE.handleError(ERROR, { level: LogLevelEnum.ERROR });

			strictEqual(STUB.calledOnce, true, "'LoggerService.Write' should be called only once");
			deepStrictEqual(STUB.firstCall.args, [EXPECTED]);
		});
	});
});
