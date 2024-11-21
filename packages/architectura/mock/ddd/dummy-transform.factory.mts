import type { DummyTransformInstantiationInterface } from "./definition/_index.mjs";
import { BaseFactory } from "../../src/_index.mjs";
import { DummyModel } from "./dummy.model.mjs";

class DummyTransformFactory extends BaseFactory<DummyModel, typeof DummyModel, DummyTransformInstantiationInterface>
{
	public override async create(parameters: DummyTransformInstantiationInterface): Promise<DummyModel>
	{
		await Promise.resolve();

		return new DummyModel({
			uuid: parameters.uuid,
			value: parseInt(parameters.value, 10),
		});
	}
}

export { DummyTransformFactory };
