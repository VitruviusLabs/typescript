import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { BaseModel } from "./base.model.mjs";

/**
 * Base factory for instantiating models
 */
abstract class BaseFactory<
	M extends BaseModel,
	C extends ConstructorOf<M> = ConstructorOf<M>,
	I = ConstructorParameters<C>[0]
>
{
	/**
	 * Default method for instantiating a new entity
	 *
	 * @remarks
	 * This is the method used by the repository to create new entities.
	 */
	public abstract create(parameters: I): M | Promise<M>;
}

export { BaseFactory };
