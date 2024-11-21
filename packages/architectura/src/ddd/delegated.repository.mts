import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { BaseModel } from "./base.model.mjs";
import type { BaseFactory } from "./base.factory.mjs";
import { BaseRepository } from "./base.repository.mjs";

/**
 * Delegated repository for storing entities
 *
 * @remarks
 * This repository delegates the storage and retrieval of entities data to a proxy object, like an ORM.
 * The type parameters are as follows:
 * - D: The delegate object that will handle the actual storage and retrieval of entities data.
 * - M: The model that will be stored and retrieved.
 * - C: The constructor of the model that will be stored and retrieved.
 * - I: The parameter expected by the factory.
**/
abstract class DelegatedRepository<
	D extends object,
	M extends BaseModel,
	C extends ConstructorOf<M>,
	I = ConstructorParameters<C>[0]
> extends BaseRepository<M, C, I>
{
	protected readonly delegate: D;

	/**
	 * Create a new repository
	 */
	public constructor(factory: BaseFactory<M, C, I>, delegate: D)
	{
		super(factory);

		this.delegate = delegate;
	}
}

export { DelegatedRepository };
