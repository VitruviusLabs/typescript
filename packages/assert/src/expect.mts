import { RootAssertionInternal } from "./internal/_index.mjs";
import { RootAssertion } from "./proxy/_index.mjs";

function expect(value: unknown): RootAssertion
{
	return new RootAssertion(new RootAssertionInternal(value));
}

export { expect };
