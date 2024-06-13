import type { FluentAssertion } from "./fluent-assertion.mjs";
import { RootAssertion } from "./_internal.mjs";

function expect(value: unknown): FluentAssertion
{
	return new RootAssertion(value);
}

export { expect };
