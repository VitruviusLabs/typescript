import type { BaseModelInstantiationInterface } from "./definition/interface/base-model-instantiation.interface.mjs";
import type { BaseModel } from "./base.model.mjs";

/**
 * Base factory for creating entities
 */
abstract class BaseFactory<
	T extends BaseModel,
	I extends BaseModelInstantiationInterface,
	C extends new (arg: I) => T
>
{
	protected readonly classConstructor: C;

	/**
	 * Create a new factory
	 */
	public constructor(class_constructor: C)
	{
		this.classConstructor = class_constructor;
	}

	/**
	 * Default method for instantiating a new entity
	 *
	 * @remarks
	 * This is the method used by the repository to create new entities.
	 */
	public create(parameters: I): T
	{
		return new this.classConstructor(parameters);
	}
}

export { BaseFactory };
