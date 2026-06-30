abstract class BaseTypeDefinition<T>
{
	public abstract assertType(value: unknown): asserts value is T;
	public abstract isOptional(): boolean;
	public abstract getEmptyValue(): T;
	public abstract isEmptyValue(value: T): boolean;

	// eslint-disable-next-line @ts/class-methods-use-this
	public isEqual(value_a: T, value_b: T): boolean
	{
		return value_a === value_b;
	}

	// @ts-expect-error -- Parameters for overrides
	// eslint-disable-next-line @ts/class-methods-use-this, @ts/no-unused-vars, @ts/no-empty-function
	public async verify(value: T): Promise<void> {}
}

export { BaseTypeDefinition };
