import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";

class GenericFactory<M extends object, C extends ConstructorOf<M>>
{
	protected readonly classConstructor: C;

	/**
	 * Create a new factory
	 *
	 * @remarks
	 * Keeping the constructor as a parameter of the repository avoid potential circular dependencies issues.
	**/
	public constructor(class_constructor: C)
	{
		this.classConstructor = class_constructor;
	}

	/**
	 * Default method for instantiating a new entity
	 *
	 * @sealed
	**/
	public create(...parameters: ConstructorParameters<C>): M
	{
		return new this.classConstructor(...parameters);
	}
}

export { GenericFactory };
