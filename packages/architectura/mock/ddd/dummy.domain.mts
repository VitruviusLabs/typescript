import { BaseDomain } from "../../src/_index.mjs";
import { DummyDelegate } from "./dummy.delegate.mjs";
import { DummyModel } from "./dummy.model.mjs";
import { DummySimpleFactory } from "./dummy-simple.factory.mjs";
import { DummyDelegatedRepository } from "./dummy-delegated.repository.mjs";

class DummyDomain extends BaseDomain
{
	public static GetDummyFactory(): DummySimpleFactory
	{
		return new DummySimpleFactory(DummyModel);
	}

	public static GetDummyDelegate(): DummyDelegate
	{
		return new DummyDelegate();
	}

	public static GetDummyRepository(): DummyDelegatedRepository
	{
		return new DummyDelegatedRepository(this.GetDummyFactory(), this.GetDummyDelegate());
	}
}

export { DummyDomain };
