import { FluentAssertion } from "../src/assertion/_internal.mjs";
import { mockAssertionInstantiation } from "./mock-assertion-instantiation.mjs";

function mockAssertion(value?: unknown): FluentAssertion
{
	const ASSERTION: FluentAssertion = new FluentAssertion(mockAssertionInstantiation());

	Reflect.set(ASSERTION, "actualValue", value);

	return ASSERTION;
}

export { mockAssertion };
