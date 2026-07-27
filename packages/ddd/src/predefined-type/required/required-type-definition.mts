import { TypeDefinition } from "../../base/auxiliary/type-definition/type-definition.mjs";

abstract class RequiredTypeDefinition<T> extends TypeDefinition<T>
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public isOptional(): false
	{
		return false;
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public getEmptyValue(): never
	{
		throw new Error("This is not an optional type");
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	public isEmptyValue(): false
	{
		return false;
	}
}

export { RequiredTypeDefinition };
