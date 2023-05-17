import { doesNotThrow, strictEqual } from "assert";

import { describe, it } from "node:test";

import { mockModule } from "../src/mockModule.mjs";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- Mock
type DummyMock = typeof import("./dummy-lib.mjs");

describe(
	"mockModule",
	(): void =>
	{
		it(
			"",
			async (): Promise<void> =>
			{
				const UUID: string = "--token--";

				const MOCK = await mockModule<DummyMock>(
					"./dummy-lib.mjs",
					import.meta.url,
					{
						// eslint-disable-next-line @typescript-eslint/naming-convention -- identifier
						"node:crypto": {
							randomUUID: (): string =>
							{
								return UUID;
							}
						},
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
