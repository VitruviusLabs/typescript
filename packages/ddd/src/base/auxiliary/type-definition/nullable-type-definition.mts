import type { BaseRequiredTypeDefinition } from "./base-required-type-definition.mjs";
import { BaseTypeDefinition } from "./base-type-definition.mjs";

class NullableTypeDefinition<T> extends BaseTypeDefinition<T | null>
{
	protected readonly definition: BaseRequiredTypeDefinition<T>;

	public constructor(definition: BaseRequiredTypeDefinition<T>)
	{
		super();

		this.definition = definition;
	}

	public assertType(value: unknown): asserts value is T | null
	{
		if (value === null)
		{
			return;
		}

		this.definition.assertType(value);
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public isOptional(): boolean
	{
		return true;
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public getEmptyValue(): T | null
	{
		return null;
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public isEmptyValue(value: T | null): boolean
	{
		return value === null;
	}

	public override isEqual(value_a: T | null, value_b: T | null): boolean
	{
		if (value_a === null && value_b === null)
		{
			return true;
		}

		if (value_a === null || value_b === null)
		{
			return false;
		}

		return this.definition.isEqual(value_a, value_b);
	}

	public override async verify(value: T | null): Promise<void>
	{
		if (value === null)
		{
			return;
		}

		await this.definition.verify(value);
	}
}

export { NullableTypeDefinition };
