/* eslint-disable @ts/class-methods-use-this */
import type { RootAssertionInternal } from "../internal/_index.mjs";
import { FluentAssertion } from "./_index.mjs";

/**
 * Root assertion
 *
 * @sealed
 */
class RootAssertion extends FluentAssertion<RootAssertionInternal>
{
	/**
	 * @throws it's the root assertion
	 */
	public override reset(): never
	{
		throw new Error("Cannot backtrack from the root assertion");
	}

	/**
	 * @throws it's the root assertion
	 */
	public override rewind(): never
	{
		throw new Error("Cannot backtrack from the root assertion");
	}
}

export { RootAssertion };
