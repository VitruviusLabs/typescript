import { BaseTypeDefinition } from "./base-type-definition.mjs";

abstract class BaseOptionalTypeDefinition<T> extends BaseTypeDefinition<T>
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public isOptional(): true
	{
		return true;
	}
}

export { BaseOptionalTypeDefinition };
