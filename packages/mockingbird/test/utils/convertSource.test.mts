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
				const SOURCE: string = `
					import { randomUUID } from "node:crypto";
					import { foo } from "file:/foo.mjs";

					function test()
					{
						return randomUUID();
					}

					export { test, foo };
				`;

				const INFOS: MockingInfos = {
					token: "12345",
					moduleIdentifier: "file:///module.mjs",
					dependencyIdentifiers: ["node:crypto", "file:///foo.mjs"],
				};

				const RESULT: unknown = convertSource(SOURCE, INFOS);

				if (typeof RESULT !== "string")
				{
					strictEqual(typeof RESULT, "string", "Return value must be a string");

					return;
				}

				match(RESULT, /\bconst \{ randomUUID \} = MockStorage.Get\("12345_node:crypto"\);/);
				match(RESULT, /\bconst \{ foo \} = MockStorage.Get\("12345_file:\/\/\/foo.mjs"\);/);
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
