import { deepStrictEqual, strictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { MockStorage } from "../../src/utils/mock-storage.mjs";
import { decodeInfos, encodeInfos } from "../../src/utils/mocking-infos.mjs";
import { resolveModuleIdentifier } from "../../src/utils/resolve-module-identifier.mjs";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import type { MockedDependency } from "../../src/definition/interface/mocked-dependency.mjs";
import type { MockingInfos } from "../../src/definition/interface/mocking-infos.mjs";

describe(
	"MockingInfos",
	(): void =>
	{
		describe(
			"decodeInfos",
			(): void =>
			{
				it(
					"should properly decode valid infos",
					(): void =>
					{
						const FAKE_INFOS: MockingInfos = {
							token: "token",
							moduleIdentifier: "module",
							dependencyIdentifiers: ["dependency"],
						};

						const ENCODED: string = Buffer.from(JSON.stringify(FAKE_INFOS), "utf-8").toString("base64");

						const RESULT: unknown = decodeInfos(ENCODED);

						deepStrictEqual(RESULT, FAKE_INFOS);
					}
				);

				it(
					"should throw when given invalid data",
					(): void =>
					{
						const FAKE_INFOS: MockingInfos = {
							token: "token",
							moduleIdentifier: "module",
							dependencyIdentifiers: ["dependency"],
						};

						const WRAPPER_INVALID_JSON = (): void =>
						{
							const ENCODED: string = Buffer.from(JSON.stringify(FAKE_INFOS).slice(1), "utf-8").toString("base64");

							decodeInfos(ENCODED);
						};

						const WRAPPER_UNENCODED = (): void =>
						{
							const ENCODED: string = JSON.stringify(FAKE_INFOS);

							decodeInfos(ENCODED);
						};

						const WRAPPER_TRUNCATED = (): void =>
						{
							const ENCODED: string = Buffer.from(JSON.stringify(FAKE_INFOS), "utf-8").toString("base64")
.slice(1);

							decodeInfos(ENCODED);
						};

						throws(WRAPPER_INVALID_JSON, createErrorTest());
						throws(WRAPPER_UNENCODED, createErrorTest());
						throws(WRAPPER_TRUNCATED, createErrorTest());
					}
				);
			}
		);

		describe(
			"encodeInfos",
			(): void =>
			{
				it(
					"should properly store mocks and encode infos",
					(): void =>
					{
						const MODULE_IDENTIFIER: string = resolveModuleIdentifier("../dummy-lib.mjs", import.meta.url);

						const MOCK: MockedDependency = {
							randomUUID: (): string =>
							{
								return "--token--";
							},
						};

						const DATA: string = encodeInfos(
							"../dummy-lib.mjs",
							import.meta.url,
							{

								"node:crypto": MOCK,
							}
						);

						const INFOS: MockingInfos = decodeInfos(DATA);

						strictEqual(INFOS.moduleIdentifier, MODULE_IDENTIFIER);

						strictEqual(INFOS.dependencyIdentifiers.length, 1);

						const DEPENDENCY_IDENTIFIER: string | undefined = INFOS.dependencyIdentifiers[0];

						strictEqual(DEPENDENCY_IDENTIFIER, "node:crypto");

						const RESULT: MockedDependency = MockStorage.Get(`${INFOS.token}_${DEPENDENCY_IDENTIFIER}`);

						strictEqual(RESULT, MOCK);
					}
				);
			}
		);
	}
);
