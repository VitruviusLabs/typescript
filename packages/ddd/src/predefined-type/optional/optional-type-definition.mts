import { TypeDefinition } from "../../base/auxiliary/type-definition/type-definition.mjs";

abstract class OptionalTypeDefinition<T> extends TypeDefinition<T>
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public isOptional(): true
	{
		return true;
	}
}

export { OptionalTypeDefinition };
