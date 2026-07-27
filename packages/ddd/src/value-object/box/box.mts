class Box<T>
{
	protected readonly content: T;

	public constructor(content: T)
	{
		this.content = content;
	}

	public get(): T
	{
		return this.content;
	}
}

export { Box };
