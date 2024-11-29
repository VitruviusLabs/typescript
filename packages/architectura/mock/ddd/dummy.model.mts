import type { DummyInstantiationInterface } from "./definition/_index.mjs";
import type { DummyDelegatedRepository } from "./dummy-delegated.repository.mjs";
import { BaseModel } from "../../src/_index.mjs";
import { DummyDomain } from "./dummy.domain.mjs";

class DummyModel extends BaseModel
{
	private value: number;

	public constructor(parameters: DummyInstantiationInterface)
	{
		super(parameters);

		this.value = parameters.value;
	}

	public setValue(value: number): void
	{
		this.value = value;
	}

	public getValue(): number
	{
		return this.value;
	}

	protected getSelfRepository(): DummyDelegatedRepository
	{
		return DummyDomain.GetDummyRepository();
	}
}

export { DummyModel };
