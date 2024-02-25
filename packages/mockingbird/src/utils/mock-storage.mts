import type { MockedDependency } from "../definition/interface/mocked-dependency.mjs";

class MockStorage
{
	private static readonly Mocks: Map<string, MockedDependency> = new Map();

	public static Get(key: string): MockedDependency
	{
		const RESULT: MockedDependency | undefined = MockStorage.Mocks.get(key);

		if (RESULT === undefined)
		{
			throw new Error(`No mock dependency associated to the key "${key}".`);
		}

		return RESULT;
	}

	public static Remove(key: string): void
	{
		MockStorage.Mocks.delete(key);
	}

	public static Set(key: string, mock: MockedDependency): void
	{
		MockStorage.Mocks.set(key, mock);
	}
}

export { MockStorage };
