import { type FluentAssertion, VoidAssertion } from "../src/assertion/_internal.mjs";

function mockVoidAssertion(parent: FluentAssertion): VoidAssertion
{
	return new VoidAssertion({
		// @ts-expect-error: Access to private property.
		root: parent.root,
		parent: parent,
	});
}

export { mockVoidAssertion };
