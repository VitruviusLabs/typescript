import type { VoidAssertionInternal } from "../internal/_index.mjs";
import { BaseAssertion } from "./_index.mjs";

/**
 * Void assertion
 *
 * @remarks
 * Void assertion represent an end point where no more assertion can be performed.
 *
 * @sealed
 */
class VoidAssertion extends BaseAssertion<VoidAssertionInternal>
{
}

export { VoidAssertion };
