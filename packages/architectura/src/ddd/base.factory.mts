import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { BaseModel } from "./base.model.mjs";

/**
 * Base factory for instantiating models
**/
abstract class BaseFactory<M extends BaseModel, C extends ConstructorOf<M>>
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

export { BaseFactory };
