import type { DummyModel } from "./dummy.model.mjs";
import type { DummyDelegateDataInterface, DummyInstantiationInterface } from "./definition/_index.mjs";
import { SimpleFactory } from "../../src/_index.mjs";

class DummySimpleFactory extends SimpleFactory<DummyModel, typeof DummyModel, DummyDelegateDataInterface>
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

export { DummySimpleFactory };
