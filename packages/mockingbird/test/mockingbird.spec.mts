import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { mockingbird } from "../src/index.mjs";
import type * as DummyModule from "./dummy/dummy-lib.mjs";

describe(
	"mockingbird",
	(): void =>
	{
		it(
			"should be able to mock a dummy lib that has a module dependency",
			async (): Promise<void> =>
			{
				const UUID: string = "--token--";

				const MOCK: typeof DummyModule = await mockingbird<typeof DummyModule>(
					"./dummy/dummy-lib.mjs",
					import.meta.url,
					{
						"node:crypto": {
							randomUUID: (): string =>
							{
								return UUID;
							},
						},
						"./dummy-dependency.mjs": {
							dummyDependency: (input: string): string =>
							{
								return input;
							},
							default: (input: string): string =>
							{
								return input;
							},
						},
					}
				);

				strictEqual(MOCK.dummy1(), UUID);
				strictEqual(MOCK.dummy2(), UUID);
				strictEqual(MOCK.dummy3(), UUID);
				strictEqual(MOCK.dummy4(), UUID);
				strictEqual(MOCK.dummy5(), UUID);
			}
		);
	}
);
