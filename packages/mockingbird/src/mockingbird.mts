import { encodeInfos } from "./utils/mocking-infos.mjs";
import { initializeHooks } from "./utils/initialize-hooks.mjs";
import { isMockedModule } from "./utils/is-mocked-module.mjs";
import { prefix } from "./utils/prefix.mjs";
import type { MockedDependency } from "./definition/interface/mocked-dependency.mjs";

async function mockingbird<MockType>(module_identifier: string, meta_url: string, mocks: Record<string, MockedDependency>): Promise<MockType>
{
	await initializeHooks();

	const DATA: string = encodeInfos(module_identifier, meta_url, mocks);

	const MOCKED_MODULE: unknown = await import(`${prefix}${DATA}`);

	isMockedModule<MockType>(MOCKED_MODULE, module_identifier);

	return MOCKED_MODULE;
}

export { mockingbird };
