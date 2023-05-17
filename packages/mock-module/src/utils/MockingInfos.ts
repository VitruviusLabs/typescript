import { randomUUID } from "node:crypto";

import { MockStorage } from "./MockStorage.js";

import { isMockedDependency } from "./isMockedDependency.js";

import { isMockingInfos } from "./isMockingInfos.js";

import { resolveModuleIdentifier } from "./resolveModuleIdentifier.js";

import type { MockedDependency } from "../Type/MockedDependency.js";

import type { MockingInfos } from "../Type/MockingInfos.js";

function encodeInfos(module_identifier: string, meta_url: string, mocks: Record<string, MockedDependency>): string
{
	const TOKEN: string = randomUUID();
	const ABSOLUTE_MODULE_IDENTIFIER: string = resolveModuleIdentifier(module_identifier, meta_url);
	const DEPENDENCY_IDENTIFIERS: Array<string> = [];

	Object.keys(mocks).forEach(
		(dependency_identifier: string): void =>
		{
			const ABSOLUTE_DEPENDENCY_IDENTIFIER: string = resolveModuleIdentifier(dependency_identifier, meta_url);
			const MOCKED_DEPENDENCY: unknown = mocks[dependency_identifier];

			isMockedDependency(MOCKED_DEPENDENCY, dependency_identifier);

			MockStorage.Set(`${TOKEN}_${ABSOLUTE_DEPENDENCY_IDENTIFIER}`, MOCKED_DEPENDENCY);
			DEPENDENCY_IDENTIFIERS.push(ABSOLUTE_DEPENDENCY_IDENTIFIER);
		}
	);

	const INFOS: MockingInfos = {
		token: TOKEN,
		moduleIdentifier: ABSOLUTE_MODULE_IDENTIFIER,
		dependencyIdentifiers: DEPENDENCY_IDENTIFIERS,
	};

	return Buffer.from(JSON.stringify(INFOS), "utf-8").toString("base64");
}

function decodeInfos(data: string): MockingInfos
{
	const INFOS: unknown = JSON.stringify(Buffer.from(data, "base64").toString("utf-8"));

	isMockingInfos(INFOS);

	return INFOS;
}

export { decodeInfos, encodeInfos };
