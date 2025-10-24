import { FluentAssertion } from "../src/assertion/_internal.mjs";

function mockChildAssertion(parent: FluentAssertion, value: unknown, name: string): FluentAssertion
{
	const ASSERTION: FluentAssertion = new FluentAssertion({
		// @ts-expect-error: Access to private property.
		root: parent.root,
		parent: parent,
		name: name,
	});

	Reflect.set(ASSERTION, "actualValue", value);

	return ASSERTION;
}

export { mockChildAssertion };
