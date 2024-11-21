import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { BaseModel } from "./base.model.mjs";
import { BaseFactory } from "./base.factory.mjs";

/**
 * Simple factory for instantiating models
 */
class SimpleFactory<M extends BaseModel, C extends ConstructorOf<M>> extends BaseFactory<M, C>
{
	private readonly classConstructor: C;

	public constructor(class_constructor: C)
	{
		super();

		this.classConstructor = class_constructor;
	}

	public create(parameters: ConstructorParameters<C>[0]): M
	{
		return new this.classConstructor(parameters);
	}
}

export { SimpleFactory };
