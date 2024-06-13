import type { FluentAssertion } from "../../assertion/fluent-assertion.mjs";
import type { RootAssertion } from "../../assertion/root-assertion.mjs";

interface BaseAssertionInstantiationInterface
{
	root?: RootAssertion;
	parent?: FluentAssertion;
}

export type { BaseAssertionInstantiationInterface };
