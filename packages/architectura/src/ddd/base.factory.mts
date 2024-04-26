import type { BaseModelInstantiationInterface } from "./definition/interface/base-model-instantiation.interface.mjs";
import type { BaseModel } from "./base.model.mjs";

abstract class BaseFactory<
	T extends BaseModel,
	I extends BaseModelInstantiationInterface,
	C extends new (arg: I) => T
>
{
	protected ClassConstructor: C;

	public constructor(class_constructor: C)
	{
		this.ClassConstructor = class_constructor;
	}

	public create(parameters: I): T
	{
		return new this.ClassConstructor(parameters);
	}
}

export { BaseFactory };
