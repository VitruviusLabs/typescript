import type { DummyInstantiationInterface } from "./definition/_index.mjs";
import type { DummyModel } from "./dummy.model.mjs";
import { AdvancedFactory } from "../../src/_index.mjs";

class DummyAdvancedFactory extends AdvancedFactory<DummyModel, typeof DummyModel>
{
	public override convertRepositoryData(parameters: DummyInstantiationInterface): DummyInstantiationInterface
	{
		return parameters;
	}
}

export { DummyAdvancedFactory };
