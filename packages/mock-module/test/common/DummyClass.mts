class DummyClass
{
	// eslint-disable-next-line @typescript-eslint/no-empty-function -- Dummy
	public static Method(): void { }

	// eslint-disable-next-line @typescript-eslint/no-empty-function -- Dummy
	public static async AsyncMethod(): Promise<void> { }

	// eslint-disable-next-line @typescript-eslint/no-empty-function, class-methods-use-this -- Dummy
	public method(): void { }

	// eslint-disable-next-line @typescript-eslint/no-empty-function, class-methods-use-this -- Dummy
	public async asyncMethod(): Promise<void> { }
}

export { DummyClass };
