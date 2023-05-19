import { doesNotThrow, strictEqual } from "assert";

import { describe, it } from "node:test";

import { mockingbird } from "../src/mockingbird.mjs";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- Mock
type DummyModule = typeof import("./dummy/dummy-lib.mjs");

describe(
	"mockingbird",
	(): void =>
	{
		it(
			"should be able to mock a dummy lib that has a module dependency",
			async (): Promise<void> =>
			{
				const UUID: string = "--token--";

				const MOCK: DummyModule = await mockingbird<DummyModule>(
					"./dummy/dummy-lib.mjs",
					import.meta.url,
					{
						"node:crypto": {
							randomUUID: (): string =>
							{
								return UUID;
							}
						},
						"./dummyDependency.mjs": {
							dummyDependency: (input: string): string =>
							{
								return input;
							}
						}
					}
				);

				const WRAPPER = (): void =>
				{
					MOCK.dummy();
				};

				doesNotThrow(WRAPPER);

				const RESULT: string = MOCK.dummy();

				strictEqual(RESULT, UUID);
			}
		);
	}
);
