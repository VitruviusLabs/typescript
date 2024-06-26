import { describe, it } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { pruneIndentTrim } from "@vitruvius-labs/toolbox";
import { type CallFrameDetailsInterface, StackTraceUtility } from "../../../src/_index.mjs";

describe("StackTraceUtility", (): void => {
	describe("GetSerializableTrace", (): void => {
		it("should return the provided error stack trace in a JSON serializable form", (): void => {
			const ERROR: Error = {
				name: "Error",
				message: "Lorem ipsum",
				stack: pruneIndentTrim(`
					Error: Test
						at alpha (file:///vitruvius-labs/typescript/packages/architectura/alpha.mjs:3:8)
						at beta (file:///vitruvius-labs/typescript/packages/architectura/beta.mjs:8:14)
						at file:///vitruvius-labs/typescript/packages/architectura/dummy.mjs:33:1
						at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
						at async ModuleLoader.import (node:internal/modules/esm/loader:316:24)
						at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:123:5)
				`),
			};

			Object.setPrototypeOf(ERROR, Error.prototype);

			const EXPECTED: Array<CallFrameDetailsInterface> = [
				{
					method: "alpha",
					line: 3,
					position: 8,
					module: "/vitruvius-labs/typescript/packages/architectura/alpha.mjs",
				},
				{
					method: "beta",
					line: 8,
					position: 14,
					module: "/vitruvius-labs/typescript/packages/architectura/beta.mjs",
				},
				{
					method: ">anonymous<",
					line: 33,
					position: 1,
					module: "/vitruvius-labs/typescript/packages/architectura/dummy.mjs",
				},
				{
					method: "ModuleJob.run",
					line: 222,
					position: 25,
					module: "node:internal/modules/esm/module_job",
				},
				{
					method: "ModuleLoader.import",
					line: 316,
					position: 24,
					module: "node:internal/modules/esm/loader",
				},
				{
					method: "asyncRunEntryPointWithESMLoader",
					line: 123,
					position: 5,
					module: "node:internal/modules/run_main",
				},
			];

			deepStrictEqual(StackTraceUtility.GetSerializableTrace(ERROR), EXPECTED);
		});

		it("should return an empty array if the error has no stack trace", (): void => {
			const ERROR: Error = {
				name: "Error",
				message: "Lorem ipsum",
			};

			Object.setPrototypeOf(ERROR, Error.prototype);

			deepStrictEqual(StackTraceUtility.GetSerializableTrace(ERROR), []);
		});
	});

	describe("GetPrettyPrintableTrace", (): void => {
		it("should return the provided error stack trace as a pretty formatted string", (): void => {
			const ERROR: Error = {
				name: "Error",
				message: "Lorem ipsum",
				stack: pruneIndentTrim(`
					Error: Test
						at alpha (file:///vitruvius-labs/typescript/packages/architectura/alpha.mjs:3:8)
						at beta (file:///vitruvius-labs/typescript/packages/architectura/beta.mjs:8:14)
						at file:///vitruvius-labs/typescript/packages/architectura/dummy.mjs:33:1
						at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
						at async ModuleLoader.import (node:internal/modules/esm/loader:316:24)
						at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:123:5)
				`),
			};

			Object.setPrototypeOf(ERROR, Error.prototype);

			const EXPECTED: string = pruneIndentTrim(`
				┌─────────────────────────────────┬──────┬──────────┬────────────────────────────────────────────────────────────┐
				│             Method              │ Line │ Position │                           Module                           │
				├─────────────────────────────────┼──────┼──────────┼────────────────────────────────────────────────────────────┤
				│ alpha                           │    3 │        8 │ /vitruvius-labs/typescript/packages/architectura/alpha.mjs │
				│ beta                            │    8 │       14 │ /vitruvius-labs/typescript/packages/architectura/beta.mjs  │
				│ >anonymous<                     │   33 │        1 │ /vitruvius-labs/typescript/packages/architectura/dummy.mjs │
				│ ModuleJob.run                   │  222 │       25 │ node:internal/modules/esm/module_job                       │
				│ ModuleLoader.import             │  316 │       24 │ node:internal/modules/esm/loader                           │
				│ asyncRunEntryPointWithESMLoader │  123 │        5 │ node:internal/modules/run_main                             │
				└─────────────────────────────────┴──────┴──────────┴────────────────────────────────────────────────────────────┘
			`);

			strictEqual(StackTraceUtility.GetPrettyPrintableTrace(ERROR), EXPECTED);
		});

		it("should return an empty string if the error has no stack trace", (): void => {
			const ERROR: Error = {
				name: "Error",
				message: "Lorem ipsum",
			};

			Object.setPrototypeOf(ERROR, Error.prototype);

			strictEqual(StackTraceUtility.GetPrettyPrintableTrace(ERROR), "");
		});
	});
});
