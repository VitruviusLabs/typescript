import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { BaseModel } from "./base.model.mjs";
import { BaseFactory } from "./base.factory.mjs";

/**
 * Advanced factory for instantiating models using a repository
 */
abstract class AdvancedFactory<M extends BaseModel, C extends ConstructorOf<M>, I = ConstructorParameters<C>[0]> extends BaseFactory<M, C>
{
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

export { AdvancedFactory };
