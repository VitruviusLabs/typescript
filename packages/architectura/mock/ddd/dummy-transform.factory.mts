import type { DummyDelegateDataInterface, DummyInstantiationInterface } from "./definition/_index.mjs";
import type { DummyModel } from "./dummy.model.mjs";
import { AdvancedFactory } from "../../src/_index.mjs";

class DummyTransformFactory extends AdvancedFactory<DummyModel, typeof DummyModel, DummyDelegateDataInterface>
{
	public override async convertRepositoryData(parameters: DummyDelegateDataInterface): Promise<DummyInstantiationInterface>
	{
		await Promise.resolve();

		return {
			uuid: parameters.uuid,
			value: parseInt(parameters.value, 10),
		};
	}
}

export { DummyTransformFactory };
