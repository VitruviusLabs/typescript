import { BaseTypeDefinition } from "./base-type-definition.mjs";

abstract class BaseRequiredTypeDefinition<T> extends BaseTypeDefinition<T>
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public isOptional(): false
	{
		return false;
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public getEmptyValue(): never
	{
		throw new Error("Not an optional type");
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public isEmptyValue(): false
	{
		return false;
	}
}

export { BaseRequiredTypeDefinition };
