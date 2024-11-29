import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { BaseModel } from "./base.model.mjs";
import { BaseFactory } from "./base.factory.mjs";

abstract class SimpleFactory<M extends BaseModel, C extends ConstructorOf<M>, I = ConstructorParameters<C>[0]> extends BaseFactory<M, C, I>
{
	private readonly modelConstructor: C;

	/**
	 * Create a new factory
	 *
	 * @remarks
	 * Keeping the model constructor as a parameter of the repository avoid potential circular dependencies issues.
	**/
	public constructor(model_constructor: C)
	{
		super();

		this.modelConstructor = model_constructor;
	}

	/**
	 * Default method for instantiating a new entity
	 *
	 * @sealed
	**/
	public create(parameters: ConstructorParameters<C>[0]): M
	{
		return new this.modelConstructor(parameters);
	}
}

export { SimpleFactory };
