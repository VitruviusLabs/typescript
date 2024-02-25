import type { ModuleFormat } from "../enum/module-format.mjs";

interface LoadContext
{
	conditions: Array<string>;
	format: ModuleFormat;
	importAssertions: Record<string, string>;
}

export type { LoadContext };
