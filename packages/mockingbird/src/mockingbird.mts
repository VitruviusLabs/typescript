
import { encodeInfos } from "./utils/MockingInfos.mjs";

import { initializeHooks } from "./utils/initializeHooks.mjs";

import { isMockedModule } from "./utils/isMockedModule.mjs";

import { prefix } from "./utils/prefix.mjs";

import type { MockedDependency } from "./Type/MockedDependency.mjs";

async function mockingbird<MockType>(module_identifier: string, meta_url: string, mocks: Record<string, MockedDependency>): Promise<MockType>
{
	await initializeHooks();

	const DATA: string = encodeInfos(module_identifier, meta_url, mocks);

	const MOCKED_MODULE: unknown = await import(`${prefix}${DATA}`);

	isMockedModule<MockType>(MOCKED_MODULE, module_identifier);

	return MOCKED_MODULE;
}

export { mockingbird };
