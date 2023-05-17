import type { MockedDependency } from "../Type/MockedDependency.js";

class MockStorage
{
	private static Mocks: Record<string, MockedDependency> = {};

	public static Set(key: string, mock: MockedDependency): void
	{
		MockStorage.Mocks[key] = mock;
	}

	public static Get(key: string): MockedDependency
	{
		const RESULT: MockedDependency | undefined = MockStorage.Mocks[key];

		if (RESULT === undefined)
		{
			throw new Error(`No module matching key ${key}`);
		}

		return RESULT;
	}

	public static Remove(key: string): void
	{
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- For clean up only
		delete MockStorage.Mocks[key];
	}
}

export { MockStorage };
