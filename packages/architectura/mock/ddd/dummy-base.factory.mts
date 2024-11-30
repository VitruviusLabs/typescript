import type { DummyDelegateDataInterface, DummyInstantiationInterface } from "./definition/_index.mjs";
import { DummyModel } from "./dummy.model.mjs";
import { BaseFactory } from "../../src/_index.mjs";

class DummyBaseFactory extends BaseFactory<DummyModel, typeof DummyModel, DummyDelegateDataInterface>
{
	public create(parameters: DummyInstantiationInterface): DummyModel
	{
		return new DummyModel(parameters);
	}

	public override async convertRepositoryData(parameters: DummyDelegateDataInterface): Promise<DummyInstantiationInterface>
	{
		await Promise.resolve();

		return {
			uuid: parameters.uuid,
			value: parseInt(parameters.value, 10),
		};
	}
}

export { DummyBaseFactory };
