class HoneyPot
{
	public static method(): unknown
	{
		class Trap
		{
			public async*trap(): AsyncGenerator<number>
			{
				yield await Promise.resolve(1);
			}
		}

		return Trap;
	}

	public static async*asyncGeneratorMethod(): AsyncGenerator<number>
	{
		yield await Promise.resolve(1);
	}
}

export { HoneyPot };
