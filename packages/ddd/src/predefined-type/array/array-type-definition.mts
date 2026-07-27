import { assertArray } from "@vitruvius-labs/ts-predicate";
import type { RequiredTypeDefinition } from "../required/required-type-definition.mjs";
import { OptionalTypeDefinition } from "../optional/optional-type-definition.mjs";

class ArrayTypeDefinition<T> extends OptionalTypeDefinition<Array<T>>
{
	protected readonly definition: RequiredTypeDefinition<T>;

	public constructor(definition: RequiredTypeDefinition<T>)
	{
		super();

		this.definition = definition;
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public getEmptyValue(): Array<T>
	{
		return [];
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public isEmptyValue(value: Array<T>): boolean
	{
		return value.length === 0;
	}

	public assertType(value: unknown): asserts value is Array<T>
	{
		assertArray(value);

		for (const item of value)
		{
			this.definition.assertType(item);
		}
	}

	public override isEqual(value_a: Array<T>, value_b: Array<T>): boolean
	{
		if (value_a.length !== value_b.length)
		{
			return false;
		}

		for (let i: number = 0; i < value_a.length; ++i)
		{
			// @ts-expect-error: There is a value at this index
			const item_a: T = value_a[i];

			// @ts-expect-error: There is a value at this index
			const item_b: T = value_b[i];

			if (!this.definition.isEqual(item_a, item_b))
			{
				return false;
			}
		}

		return true;
	}

	public override async verify(value: Array<T>): Promise<void>
	{
		for (const item of value)
		{
			await this.definition.verify(item);
		}
	}
}

export { ArrayTypeDefinition };
