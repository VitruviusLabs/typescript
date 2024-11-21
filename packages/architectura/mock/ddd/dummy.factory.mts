import type { DummyInstantiationInterface } from "./definition/_index.mjs";
import { BaseFactory } from "../../src/_index.mjs";
import { DummyModel } from "./dummy.model.mjs";

class DummyFactory extends BaseFactory<DummyModel, typeof DummyModel>
{
	public async create(parameters: DummyInstantiationInterface): Promise<DummyModel>
	{
		await Promise.resolve();

		return new DummyModel(parameters);
	}
}

export { DummyFactory };
