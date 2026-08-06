import type { FluentAssertionInternal } from "../../fluent-assertion.mjs";
import type { RootAssertionInternal } from "../../root-assertion.mjs";

interface BaseAssertionInstantiationInterface
{
	root?: RootAssertionInternal;
	parent?: FluentAssertionInternal;
}

export type { BaseAssertionInstantiationInterface };
