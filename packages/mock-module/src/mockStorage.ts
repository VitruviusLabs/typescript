import type { MockedModule } from "./Type/MockedModule.js";

const MOCKED_MODULES: Record<string, MockedModule> = {};

function setMockedModule(key: string, mock: MockedModule): void
{
	MOCKED_MODULES[key] = mock;
}

function getMockedModule(key: string): MockedModule
{
	const RESULT: MockedModule | undefined = MOCKED_MODULES[key];

	if (RESULT === undefined)
	{
		throw new Error(`No module matching key ${key}`);
	}

	return RESULT;
}

function removeMockedModule(key: string): void
{
	// eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- For clean up only
	delete MOCKED_MODULES[key];
}

export { getMockedModule, removeMockedModule, setMockedModule };
