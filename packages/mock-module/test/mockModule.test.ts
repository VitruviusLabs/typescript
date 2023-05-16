import { doesNotThrow, strictEqual } from "assert";

import { describe, it } from "node:test";

import { mockModule } from "../src/mockModule.js";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- Mock
type DummyMock = typeof import("./dummy-lib.js");

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
					"./dummy-lib.js",
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
