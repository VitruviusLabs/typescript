import { randomUUID } from "node:crypto";

import { isMockedDependency } from "./Utils/isMockedDependency.js";

import { isMockedModule } from "./Utils/isMockedModule.js";

import { setMockedModule } from "./Utils/mockStorage.js";

import { prefix } from "./prefix.js";

import { resolveModuleIdentifier } from "./Utils/resolveModuleIdentifier.js";

import type { MockedDependency } from "./Type/MockedDependency.js";

import type { MockedModule } from "./Type/MockedModule.js";

import type { MockingInfos } from "./Type/MockingInfos.js";

async function mockModule(module_identifier: string, meta_url: string, mocks: Record<string, MockedDependency>): Promise<MockedModule>
{
	const TOKEN: string = randomUUID();
	const ABSOLUTE_MODULE_IDENTIFIER: string = resolveModuleIdentifier(module_identifier, meta_url);
	const DEPENDENCY_IDENTIFIERS: Array<string> = [];

	Object.keys(mocks).forEach(
		(dependency_identifier: string): void =>
		{
			const ABSOLUTE_DEPENDENCY_IDENTIFIER: string = resolveModuleIdentifier(dependency_identifier, meta_url);

			const MOCKED_DEPENDENCY: unknown = mocks[dependency_identifier];

			if (!isMockedDependency(MOCKED_DEPENDENCY))
			{
				throw new Error(`Invalid mocked module ${dependency_identifier}`);
			}

			setMockedModule(`${TOKEN}_${ABSOLUTE_DEPENDENCY_IDENTIFIER}`, MOCKED_DEPENDENCY);
			DEPENDENCY_IDENTIFIERS.push(ABSOLUTE_DEPENDENCY_IDENTIFIER);
		}
	);

	const INFOS: MockingInfos = {
		token: TOKEN,
		moduleIdentifier: ABSOLUTE_MODULE_IDENTIFIER,
		dependencyIdentifiers: DEPENDENCY_IDENTIFIERS,
	};

	const DATA: string = Buffer.from(JSON.stringify(INFOS), "utf-8").toString("base64");

	const MOCKED_MODULE: unknown = await import(`${prefix}${DATA}`);

	if (!isMockedModule(MOCKED_MODULE))
	{
		throw new Error(`An error occured when mocking ${module_identifier}`);
	}

	return MOCKED_MODULE;
}

export { mockModule };
