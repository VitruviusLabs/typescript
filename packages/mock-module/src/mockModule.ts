import { prefix } from "./prefix.js";

import { encodeInfos } from "./utils/MockingInfos.js";

import { isMockedModule } from "./utils/isMockedModule.js";

import type { MockedDependency } from "./Type/MockedDependency.js";

async function mockModule<MockType>(module_identifier: string, meta_url: string, mocks: Record<string, MockedDependency>): Promise<MockType>
{
	const DATA: string = encodeInfos(module_identifier, meta_url, mocks);

	const MOCKED_MODULE: unknown = await import(`${prefix}${DATA}`);

	isMockedModule<MockType>(MOCKED_MODULE, module_identifier);

	return MOCKED_MODULE;
}

export { mockModule };
