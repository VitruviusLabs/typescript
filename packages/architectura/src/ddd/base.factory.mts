import type { AbstractConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { BaseModel } from "./base.model.mjs";

/**
 * Base factory for instantiating models
**/
abstract class BaseFactory<M extends BaseModel, C extends AbstractConstructorOf<M>, I = ConstructorParameters<C>[0]>
{
	public abstract create(parameters: ConstructorParameters<C>[0]): M;

	/**
	 * Convert the data retrieved from by the repository into what the model constructor expects
	 */
	protected abstract convertRepositoryData(parameters: I): ConstructorParameters<C>[0] | Promise<ConstructorParameters<C>[0]>;

	/**
	 * Method used by the repository for instantiating a new entity
	 *
	 * @sealed
	 */
	public async createFromRepositoryData(parameters: I): Promise<M>
	{
		return this.create(await this.convertRepositoryData(parameters));
	}
}

export { BaseFactory };
