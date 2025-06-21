import type { AssertionInstantiationInterface } from "../src/definition/interface/assertion-instantiation.interface.mjs";
import { FluentAssertion, RootAssertion } from "../src/assertion/_internal.mjs";

function mockAssertionInstantiation(): Required<AssertionInstantiationInterface>
{
	const ROOT: RootAssertion = new RootAssertion("root");
	const PARENT: FluentAssertion = new FluentAssertion({ root: ROOT, parent: ROOT, name: "parent" });

	return {
		root: ROOT,
		parent: PARENT,
		name: "the tested value",
	};
}

export { mockAssertionInstantiation };
