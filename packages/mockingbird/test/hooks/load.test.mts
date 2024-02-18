import { deepStrictEqual, notDeepStrictEqual, rejects } from "node:assert";

import { describe, it } from "node:test";

import { ModuleFormat } from "../../src/Type/ModuleFormat.mjs";

import { load } from "../../src/hooks/_index.mjs";

import { MockStorage } from "../../src/utils/MockStorage.mjs";

import { encodeInfos } from "../../src/utils/MockingInfos.mjs";

import { prefix } from "../../src/utils/prefix.mjs";

import { testError } from "../common/utils.mjs";

import type { LoadContext } from "../../src/Type/LoadContext.mjs";

import type { LoadResult } from "../../src/Type/LoadResult.mjs";

const CONTEXT: LoadContext = {
	conditions: [],
	format: ModuleFormat.MODULE,
	importAssertions: {}
};

describe(
	"load",
	(): void =>
	{
		it(
			"should ignore non-mocked modules",
			async (): Promise<void> =>
			{
				const EXPECTED_LOAD_RESULT: LoadResult = {
					shortCircuit: false,
					format: ModuleFormat.MODULE,
					source: "test source"
				};

				const RESULT: LoadResult = await load(
					import.meta.url,
					CONTEXT,
					async (): Promise<LoadResult> =>
					{
						return await Promise.resolve(EXPECTED_LOAD_RESULT);
					}
				);

				deepStrictEqual(RESULT, EXPECTED_LOAD_RESULT);
			}
		);

		it(
			"should short-circuit mocked modules",
			async (): Promise<void> =>
			{
				const TRAP_LOAD_RESULT: LoadResult = {
					shortCircuit: false,
					format: ModuleFormat.COMMON_JS,
					source: "test source"
				};

				const INFOS: string = encodeInfos("../dummy/dummy-lib.mjs", import.meta.url, {});

				const RESULT: LoadResult = await load(
					`${prefix}${INFOS}`,
					CONTEXT,
					async (): Promise<LoadResult> =>
					{
						return await Promise.resolve(TRAP_LOAD_RESULT);
					}
				);

				notDeepStrictEqual(RESULT, TRAP_LOAD_RESULT);

				// @ts-expect-error: reset mocks
				MockStorage.Mocks = {};
			}
		);

		it(
			"should throw when it cannot find a module",
			async (): Promise<void> =>
			{
				const TRAP_LOAD_RESULT: LoadResult = {
					shortCircuit: false,
					format: ModuleFormat.COMMON_JS,
					source: "test source"
				};

				const INFOS: string = encodeInfos("../dummy/unknown-lib.mjs", import.meta.url, {});

				const WRAPPER = async (): Promise<void> =>
				{
					await load(
						`${prefix}${INFOS}`,
						CONTEXT,
						async (): Promise<LoadResult> =>
						{
							return await Promise.resolve(TRAP_LOAD_RESULT);
						}
					);
				};

				await rejects(WRAPPER, testError);

				// @ts-expect-error: reset mocks
				MockStorage.Mocks = {};
			}
		);
	}
);
