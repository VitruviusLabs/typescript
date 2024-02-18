import { match, strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { convertSource } from "../../src/utils/convertSource.mjs";

import type { MockingInfos } from "../../src/Type/MockingInfos.mjs";

describe(
	"convertSource",
	(): void =>
	{
		it(
			"should prepend an import of the MockStorage module",
			(): void =>
			{
				const SOURCE: string = "";

				const INFOS: MockingInfos = {
					token: "token",
					moduleIdentifier: "file:/module.mjs",
					dependencyIdentifiers: [],
				};

				const RESULT: unknown = convertSource(SOURCE, INFOS);

				if (typeof RESULT !== "string")
				{
					strictEqual(typeof RESULT, "string", "Return value must be a string");

					return;
				}

				match(RESULT, /\bimport \{ MockStorage \} from ".*\/MockStorage\.mjs";/);
			}
		);

		it(
			"should replace mocked dependencies.",
			(): void =>
			{
				// Ugly spacing for testing purposes
				const SOURCE: string = `
					import {randomUUID} from "node:crypto";
					import   {   alpha   }   from   "file:/alpha.mjs";
					import { beta   as   omega } from "file:/beta.mjs";
					import   *   as   gamma   from "file:/gamma.mjs";
					import   delta   from "file:/delta.mjs";
					import   {   default   as   epsilon   }   from "file:/epsilon.mjs";

					function test()
					{
						return randomUUID();
					}

					export { test, alpha, omega, gamma, delta, epsilon };
				`;

				const INFOS: MockingInfos = {
					token: "12345",
					moduleIdentifier: "file:///module.mjs",
					dependencyIdentifiers: [
						"node:crypto",
						"file:///alpha.mjs",
						"file:///beta.mjs",
						"file:///gamma.mjs",
						"file:///delta.mjs",
						"file:///epsilon.mjs",
					],
				};

				const RESULT: unknown = convertSource(SOURCE, INFOS);

				if (typeof RESULT !== "string")
				{
					strictEqual(typeof RESULT, "string", "Return value must be a string");

					return;
				}

				match(RESULT, /\bconst \{randomUUID\} = MockStorage.Get\("12345_node:crypto"\);/);
				match(RESULT, /\bconst \{ {3}alpha {3}\} = MockStorage.Get\("12345_file:\/\/\/alpha.mjs"\);/);
				match(RESULT, /\bconst \{ beta: omega \} = MockStorage.Get\("12345_file:\/\/\/beta.mjs"\);/);
				match(RESULT, /\bconst gamma = MockStorage.Get\("12345_file:\/\/\/gamma.mjs"\);/);
				match(RESULT, /\bconst \{ default: delta \} = MockStorage.Get\("12345_file:\/\/\/delta.mjs"\);/);
				match(RESULT, /\bconst \{ {3}default: epsilon {3}\} = MockStorage.Get\("12345_file:\/\/\/epsilon.mjs"\);/);
			}
		);

		it(
			"should ignore non-mocked dependencies.",
			(): void =>
			{
				const SOURCE: string = `
					import { randomUUID } from "node:crypto";

					function test()
					{
						return randomUUID();
					}

					export { test };
				`;

				const INFOS: MockingInfos = {
					token: "12345",
					moduleIdentifier: "file:/module.mjs",
					dependencyIdentifiers: [],
				};

				const RESULT: unknown = convertSource(SOURCE, INFOS);

				if (typeof RESULT !== "string")
				{
					strictEqual(typeof RESULT, "string", "Return value must be a string");

					return;
				}

				match(RESULT, /\bimport \{ randomUUID \} from "node:crypto";/);
			}
		);

		it(
			"should replace non-mocked dependencies relative path to the corresponding absolute path.",
			(): void =>
			{
				const SOURCE: string = `
					import { bar } from "./bar.mjs";

					function test()
					{
						bar();
					}

					export { test };
				`;

				const INFOS: MockingInfos = {
					token: "12345",
					moduleIdentifier: "file:/module.mjs",
					dependencyIdentifiers: [],
				};

				const RESULT: unknown = convertSource(SOURCE, INFOS);

				if (typeof RESULT !== "string")
				{
					strictEqual(typeof RESULT, "string", "Return value must be a string");

					return;
				}

				match(RESULT, /\bimport \{ bar \} from "\/bar.mjs";/);
			}
		);

		it(
			"should append code that clear the storage from the mocks",
			(): void =>
			{
				const SOURCE: string = ``;

				const INFOS: MockingInfos = {
					token: "12345",
					moduleIdentifier: "file:/module.mjs",
					dependencyIdentifiers: ["node:crypto", "file:///foo.mjs"],
				};

				const RESULT: unknown = convertSource(SOURCE, INFOS);

				if (typeof RESULT !== "string")
				{
					strictEqual(typeof RESULT, "string", "Return value must be a string");

					return;
				}

				match(RESULT, /\bMockStorage.Remove\("12345_node:crypto"\);/);
				match(RESULT, /\bMockStorage.Remove\("12345_file:\/\/\/foo.mjs"\);/);
			}
		);
	}
);
