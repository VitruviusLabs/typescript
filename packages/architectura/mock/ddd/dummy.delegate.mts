class DummyDelegate
{
	public async query<T>(result: T): Promise<T>
	{
		return await Promise.resolve(result);
	}
}

export { DummyDelegate };
